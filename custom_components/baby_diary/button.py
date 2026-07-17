"""Baby Diary buttons."""

from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    DATA_STORES,
    DIAPER_AMBOS,
    DIAPER_COCO,
    DIAPER_XIXI,
    DOMAIN,
)
from .store import BabyDiaryStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Baby Diary buttons."""
    store: BabyDiaryStore = hass.data[DOMAIN][DATA_STORES][entry.entry_id]

    async_add_entities(
        [
            BabyDiaryLogButton(store, DIAPER_XIXI, "Log Xixi", "baby:xixi"),
            BabyDiaryLogButton(store, DIAPER_COCO, "Log Cocó", "baby:coco"),
            BabyDiaryLogButton(store, DIAPER_AMBOS, "Log Ambos", "baby:ambos"),
        ]
    )


class BabyDiaryLogButton(ButtonEntity):
    """Button that logs one diaper change for a baby."""

    _attr_should_poll = False

    def __init__(
        self,
        store: BabyDiaryStore,
        diaper_type: str,
        label: str,
        icon: str,
    ) -> None:
        self._store = store
        self._diaper_type = diaper_type
        self._attr_name = f"{label} {store.baby_name}"
        self._attr_unique_id = f"{store.entry.entry_id}_log_{diaper_type}"
        self._attr_icon = icon
        self._attr_device_info = store.device_info

    async def async_press(self) -> None:
        """Log a diaper change."""
        await self._store.async_log_diaper_change(self._diaper_type)
