"""Baby Diary integration."""

from __future__ import annotations

from contextlib import suppress
from pathlib import Path
import logging

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url, remove_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import (
    CoreState,
    EVENT_HOMEASSISTANT_STARTED,
    HomeAssistant,
    ServiceCall,
)
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_call_later
from homeassistant.helpers.typing import ConfigType
from homeassistant.util import slugify

from .const import (
    CONF_BABY_NAME,
    ATTR_ENTRY_ID,
    ATTR_TYPE,
    DATA_FRONTEND_REGISTERED,
    DATA_FRONTEND_RESOURCE_REGISTERED,
    DATA_FRONTEND_RESOURCE_RETRY_UNSUB,
    DATA_FRONTEND_STARTED_UNSUB,
    DATA_STORE_SLUGS,
    DATA_STORES,
    DIAPER_TYPES,
    DOMAIN,
    FRONTEND_RESOURCE_MAX_ATTEMPTS,
    FRONTEND_RESOURCE_RETRY_SECONDS,
    PLATFORMS,
    SERVICE_LOG_DIAPER_CHANGE,
    SERVICE_TOGGLE_FEEDING,
    VERSION,
)
from .store import BabyDiaryStore

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = Path(__file__).parent / "frontend"
FRONTEND_FILE = FRONTEND_DIR / "baby-diary.js"
FRONTEND_URL_BASE = f"/{DOMAIN}"
FRONTEND_URL = f"{FRONTEND_URL_BASE}/baby-diary.js"
FRONTEND_MODULE_URL = f"{FRONTEND_URL}?v={VERSION}"
LEGACY_FRONTEND_MODULE_URLS = (
    FRONTEND_URL,
    f"{FRONTEND_URL}?v=0.3.1",
    f"{FRONTEND_URL}?v=0.3.2",
    f"{FRONTEND_URL}?v=0.3.3",
    f"{FRONTEND_URL}?v=0.3.4",
    f"{FRONTEND_URL}?v=0.3.5",
    f"{FRONTEND_URL}?v=0.3.6",
    f"{FRONTEND_URL}?v=0.3.7",
    f"{FRONTEND_URL}?v=0.4.0",
    f"{FRONTEND_URL}?v=0.4.1",
    f"{FRONTEND_URL}?v=0.4.2",
    f"{FRONTEND_URL}?v=0.4.3",
)

LOG_DIAPER_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_TYPE): vol.In(DIAPER_TYPES),
        vol.Optional(CONF_BABY_NAME): str,
        vol.Optional(ATTR_ENTRY_ID): str,
    }
)

ROUTE_TO_BABY_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_BABY_NAME): str,
        vol.Optional(ATTR_ENTRY_ID): str,
    }
)


async def async_setup(hass: HomeAssistant, _config: ConfigType) -> bool:
    """Set up Baby Diary."""
    _ensure_domain_data(hass)
    await _async_register_frontend(hass)

    async def handle_log_diaper_change(call: ServiceCall) -> None:
        store = _get_store_for_service(hass, call)
        await store.async_log_diaper_change(call.data[ATTR_TYPE])

    hass.services.async_register(
        DOMAIN,
        SERVICE_LOG_DIAPER_CHANGE,
        handle_log_diaper_change,
        schema=LOG_DIAPER_SCHEMA,
    )

    async def handle_toggle_feeding(call: ServiceCall) -> None:
        store = _get_store_for_service(hass, call)
        await store.async_toggle_feeding()

    hass.services.async_register(
        DOMAIN,
        SERVICE_TOGGLE_FEEDING,
        handle_toggle_feeding,
        schema=ROUTE_TO_BABY_SCHEMA,
    )

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Baby Diary from a config entry."""
    _ensure_domain_data(hass)

    await _async_register_frontend(hass)

    store = BabyDiaryStore(hass, entry)
    await store.async_load()
    store.async_start()

    hass.data[DOMAIN][DATA_STORES][entry.entry_id] = store
    hass.data[DOMAIN][DATA_STORE_SLUGS][store.baby_slug] = entry.entry_id
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a Baby Diary config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if not unload_ok:
        return False

    store: BabyDiaryStore | None = hass.data[DOMAIN][DATA_STORES].pop(
        entry.entry_id, None
    )
    if store:
        store.async_stop()
        hass.data[DOMAIN][DATA_STORE_SLUGS].pop(store.baby_slug, None)

    if not hass.data[DOMAIN][DATA_STORES]:
        _async_remove_frontend(hass)

    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload Baby Diary."""
    await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Remove a Baby Diary config entry."""
    domain_data = hass.data.get(DOMAIN, {})
    stores: dict[str, BabyDiaryStore] = domain_data.get(DATA_STORES, {})
    store_slugs: dict[str, str] = domain_data.get(DATA_STORE_SLUGS, {})
    store = stores.pop(entry.entry_id, None)

    if store is None:
        store = BabyDiaryStore(hass, entry)
    else:
        store.async_stop()
        store_slugs.pop(store.baby_slug, None)

    if not stores:
        _async_remove_frontend(hass)

    await store.async_remove()


def _ensure_domain_data(hass: HomeAssistant) -> None:
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN].setdefault(DATA_STORES, {})
    hass.data[DOMAIN].setdefault(DATA_STORE_SLUGS, {})


async def _async_register_frontend(hass: HomeAssistant) -> None:
    _async_remove_frontend_urls(hass, LEGACY_FRONTEND_MODULE_URLS)

    if not hass.data[DOMAIN].get(DATA_FRONTEND_REGISTERED):
        if not FRONTEND_FILE.exists():
            _LOGGER.warning("Baby Diary frontend file was not found: %s", FRONTEND_FILE)
            return

        with suppress(RuntimeError):
            await hass.http.async_register_static_paths(
                [StaticPathConfig(FRONTEND_URL_BASE, str(FRONTEND_DIR), False)]
            )
        add_extra_js_url(hass, FRONTEND_MODULE_URL)
        hass.data[DOMAIN][DATA_FRONTEND_REGISTERED] = True

    _schedule_lovelace_resource_registration(hass)


def _schedule_lovelace_resource_registration(
    hass: HomeAssistant, *, attempt: int = 1, delay: int = 0
) -> None:
    """Register the dashboard resource when Lovelace is ready."""
    if hass.data[DOMAIN].get(DATA_FRONTEND_RESOURCE_REGISTERED):
        return

    if hass.state != CoreState.running:
        if not hass.data[DOMAIN].get(DATA_FRONTEND_STARTED_UNSUB):
            def _register_after_started(_event) -> None:
                hass.data[DOMAIN].pop(DATA_FRONTEND_STARTED_UNSUB, None)
                _schedule_lovelace_resource_registration(hass, attempt=attempt)

            hass.data[DOMAIN][DATA_FRONTEND_STARTED_UNSUB] = (
                hass.bus.async_listen_once(
                    EVENT_HOMEASSISTANT_STARTED,
                    _register_after_started,
                )
            )
        return

    _cancel_frontend_resource_retry(hass)

    def _run(_now=None) -> None:
        hass.data[DOMAIN].pop(DATA_FRONTEND_RESOURCE_RETRY_UNSUB, None)
        hass.async_create_task(_async_register_lovelace_resource(hass, attempt))

    if delay <= 0:
        _run()
        return

    hass.data[DOMAIN][DATA_FRONTEND_RESOURCE_RETRY_UNSUB] = async_call_later(
        hass, delay, _run
    )


def _retry_lovelace_resource_registration(
    hass: HomeAssistant, reason: str, attempt: int
) -> None:
    """Retry Lovelace resource registration for startup timing races."""
    if attempt >= FRONTEND_RESOURCE_MAX_ATTEMPTS:
        _LOGGER.warning(
            "Baby Diary Lovelace resource was not registered after %s attempts: %s",
            attempt,
            reason,
        )
        return

    _LOGGER.debug(
        "Baby Diary Lovelace resource is not ready yet (%s); retrying in %s seconds",
        reason,
        FRONTEND_RESOURCE_RETRY_SECONDS,
    )
    _schedule_lovelace_resource_registration(
        hass,
        attempt=attempt + 1,
        delay=FRONTEND_RESOURCE_RETRY_SECONDS,
    )


def _cancel_frontend_resource_retry(hass: HomeAssistant) -> None:
    unsub = hass.data[DOMAIN].pop(DATA_FRONTEND_RESOURCE_RETRY_UNSUB, None)
    if unsub:
        unsub()


async def _async_register_lovelace_resource(
    hass: HomeAssistant, attempt: int = 1
) -> None:
    try:
        await _async_register_lovelace_resource_once(hass, attempt)
    except (KeyError, ValueError, TypeError, AttributeError):
        _LOGGER.exception("Unable to register Baby Diary Lovelace resource")


async def _async_register_lovelace_resource_once(
    hass: HomeAssistant, attempt: int
) -> None:
    """Register the card module as a dashboard resource in storage mode."""
    lovelace = hass.data.get("lovelace")
    if lovelace is None:
        _retry_lovelace_resource_registration(hass, "Lovelace is not loaded", attempt)
        return

    resources = getattr(lovelace, "resources", None)
    resource_mode = getattr(lovelace, "resource_mode", getattr(lovelace, "mode", None))

    if resources is None:
        _retry_lovelace_resource_registration(
            hass, "Lovelace resources are not loaded", attempt
        )
        return

    if _resource_mode_value(resource_mode) != "storage":
        _LOGGER.debug(
            "Baby Diary Lovelace resource registration skipped because resource mode is %s",
            _resource_mode_value(resource_mode),
        )
        return

    if not getattr(resources, "loaded", False):
        await resources.async_load()

    matches = [
        resource
        for resource in resources.async_items()
        if _frontend_resource_path(resource.get("url", "")) == FRONTEND_URL
    ]

    if not matches:
        await resources.async_create_item(
            {"res_type": "module", "url": FRONTEND_MODULE_URL}
        )
        hass.data[DOMAIN][DATA_FRONTEND_RESOURCE_REGISTERED] = True
        return

    primary, *duplicates = matches
    if primary.get("url") != FRONTEND_MODULE_URL or primary.get("res_type") != "module":
        await resources.async_update_item(
            primary["id"], {"res_type": "module", "url": FRONTEND_MODULE_URL}
        )

    for duplicate in duplicates:
        await resources.async_delete_item(duplicate["id"])

    hass.data[DOMAIN][DATA_FRONTEND_RESOURCE_REGISTERED] = True


def _frontend_resource_path(frontend_url: str) -> str:
    """Return a frontend resource URL without its query string."""
    return frontend_url.split("?", 1)[0]


def _resource_mode_value(resource_mode: object) -> object:
    """Return the string value from Home Assistant's Lovelace resource mode."""
    return getattr(resource_mode, "value", resource_mode)


def _async_remove_frontend(hass: HomeAssistant) -> None:
    hass.data[DOMAIN].pop(DATA_FRONTEND_REGISTERED, False)
    hass.data[DOMAIN].pop(DATA_FRONTEND_RESOURCE_REGISTERED, False)
    _cancel_frontend_resource_retry(hass)
    started_unsub = hass.data[DOMAIN].pop(DATA_FRONTEND_STARTED_UNSUB, None)
    if started_unsub:
        started_unsub()
    _async_remove_frontend_urls(
        hass, (*LEGACY_FRONTEND_MODULE_URLS, FRONTEND_MODULE_URL)
    )


def _async_remove_frontend_urls(
    hass: HomeAssistant, frontend_urls: tuple[str, ...]
) -> None:
    for frontend_url in frontend_urls:
        with suppress(KeyError, ValueError):
            remove_extra_js_url(hass, frontend_url)


def _get_store_for_service(
    hass: HomeAssistant, call: ServiceCall
) -> BabyDiaryStore:
    stores: dict[str, BabyDiaryStore] = hass.data.get(DOMAIN, {}).get(DATA_STORES, {})
    store_slugs: dict[str, str] = hass.data.get(DOMAIN, {}).get(DATA_STORE_SLUGS, {})
    entry_id = call.data.get(ATTR_ENTRY_ID)
    baby_name = call.data.get(CONF_BABY_NAME)

    if entry_id:
        if entry_id not in stores:
            raise HomeAssistantError(f"Baby Diary entry was not found: {entry_id}")
        return stores[entry_id]

    if baby_name:
        baby_slug = slugify(baby_name)
        if baby_slug not in store_slugs:
            raise HomeAssistantError(f"Baby Diary baby was not found: {baby_name}")
        return stores[store_slugs[baby_slug]]

    if len(stores) == 1:
        return next(iter(stores.values()))

    if not stores:
        raise HomeAssistantError("Set up Baby Diary before logging a diaper change.")

    raise HomeAssistantError(
        "Multiple Baby Diary entries exist; pass baby_name or entry_id to "
        "log_diaper_change."
    )
