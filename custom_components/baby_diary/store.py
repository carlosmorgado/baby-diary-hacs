"""Persistent Baby Diary counters."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util
from homeassistant.util import slugify

from .const import (
    CONF_BABY_NAME,
    DEFAULT_BABY_NAME,
    DIAPER_AMBOS,
    DIAPER_COCO,
    DIAPER_XIXI,
    DOMAIN,
    METRIC_COCO,
    METRIC_DIAPERS,
    METRIC_XIXI,
    METRICS,
    SIGNAL_UPDATED,
)

STORAGE_VERSION = 1


class BabyDiaryStore:
    """Store diaper counters for one baby."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, f"{DOMAIN}.{entry.entry_id}"
        )
        self._data = self._empty_data()
        self._unsub_midnight: Callable[[], None] | None = None

    async def async_load(self) -> None:
        """Load stored counter data."""
        stored = await self._store.async_load()
        if stored:
            self._data = self._normalize(stored)

        if self._rollover_daily():
            await self.async_save()

    @callback
    def async_start(self) -> None:
        """Start daily rollover tracking."""
        self._unsub_midnight = async_track_time_change(
            self.hass, self._handle_midnight, hour=0, minute=0, second=5
        )

    @callback
    def async_stop(self) -> None:
        """Stop daily rollover tracking."""
        if self._unsub_midnight:
            self._unsub_midnight()
            self._unsub_midnight = None

    async def async_log_diaper_change(self, diaper_type: str) -> None:
        """Log a diaper change."""
        self._rollover_daily()

        if diaper_type == DIAPER_XIXI:
            metrics = (METRIC_XIXI, METRIC_DIAPERS)
        elif diaper_type == DIAPER_COCO:
            metrics = (METRIC_COCO, METRIC_DIAPERS)
        elif diaper_type == DIAPER_AMBOS:
            metrics = (METRIC_XIXI, METRIC_COCO, METRIC_DIAPERS)
        else:
            raise ValueError(f"Unsupported diaper type: {diaper_type}")

        for metric in metrics:
            self._data["totals"][metric] += 1
            self._data["daily"][metric] += 1

        await self.async_save()
        self.async_update_listeners()

    async def async_save(self) -> None:
        """Persist data."""
        await self._store.async_save(self._data)

    async def async_remove(self) -> None:
        """Remove persisted counter data."""
        await self._store.async_remove()

    @callback
    def total(self, metric: str) -> int:
        """Return total count."""
        self._rollover_daily()
        return int(self._data["totals"][metric])

    @callback
    def daily(self, metric: str) -> int:
        """Return daily count."""
        self._rollover_daily()
        return int(self._data["daily"][metric])

    @callback
    def async_update_listeners(self) -> None:
        """Notify entities that values changed."""
        async_dispatcher_send(self.hass, self.signal)

    @property
    def signal(self) -> str:
        """Return this store's update signal."""
        return f"{SIGNAL_UPDATED}_{self.entry.entry_id}"

    @property
    def baby_name(self) -> str:
        """Return the baby name for this store."""
        return str(self.entry.data.get(CONF_BABY_NAME, DEFAULT_BABY_NAME))

    @property
    def baby_slug(self) -> str:
        """Return the normalized baby slug."""
        return slugify(self.baby_name)

    @property
    def device_info(self) -> dict[str, Any]:
        """Return the shared Baby Diary device info."""
        return {
            "identifiers": {(DOMAIN, self.entry.entry_id)},
            "name": f"Baby Diary {self.baby_name}",
            "manufacturer": "Baby Diary",
        }

    @callback
    def _handle_midnight(self, _now: Any) -> None:
        """Schedule reset after midnight."""
        self.hass.async_create_task(self._async_reset_for_new_day())

    async def _async_reset_for_new_day(self) -> None:
        if self._rollover_daily():
            await self.async_save()
            self.async_update_listeners()

    @callback
    def _rollover_daily(self) -> bool:
        today = dt_util.now().date().isoformat()
        if self._data["daily_date"] == today:
            return False

        self._data["daily_date"] = today
        self._data["daily"] = self._empty_counts()
        return True

    def _normalize(self, stored: dict[str, Any]) -> dict[str, Any]:
        totals = {**self._empty_counts(), **stored.get("totals", {})}
        daily = {**self._empty_counts(), **stored.get("daily", {})}
        return {
            "daily_date": stored.get("daily_date") or dt_util.now().date().isoformat(),
            "totals": {metric: int(totals.get(metric, 0)) for metric in METRICS},
            "daily": {metric: int(daily.get(metric, 0)) for metric in METRICS},
        }

    def _empty_data(self) -> dict[str, Any]:
        return {
            "daily_date": dt_util.now().date().isoformat(),
            "totals": self._empty_counts(),
            "daily": self._empty_counts(),
        }

    @staticmethod
    def _empty_counts() -> dict[str, int]:
        return {metric: 0 for metric in METRICS}
