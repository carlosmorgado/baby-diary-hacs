"""Baby Diary sensors."""

from __future__ import annotations

from collections.abc import Callable

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    DATA_STORES,
    DOMAIN,
    METRIC_COCO,
    METRIC_DIAPERS,
    METRIC_XIXI,
)
from .store import BabyDiaryStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Baby Diary sensors."""
    store: BabyDiaryStore = hass.data[DOMAIN][DATA_STORES][entry.entry_id]
    baby_name = store.baby_name

    async_add_entities(
        [
            BabyDiaryCountSensor(
                store,
                baby_name,
                "total_diapers",
                f"Fraldas {baby_name} Counter Sensor",
                "baby:diaper",
                lambda data: data.total(METRIC_DIAPERS),
            ),
            BabyDiaryCountSensor(
                store,
                baby_name,
                "total_xixi",
                f"Xixis {baby_name} Counter Sensor",
                "baby:xixi",
                lambda data: data.total(METRIC_XIXI),
            ),
            BabyDiaryCountSensor(
                store,
                baby_name,
                "total_coco",
                f"Cocos {baby_name} Counter Sensor",
                "baby:coco",
                lambda data: data.total(METRIC_COCO),
            ),
            BabyDiaryCountSensor(
                store,
                baby_name,
                "daily_diapers",
                f"Daily Fraldas {baby_name} Counter",
                "baby:diaper",
                lambda data: data.daily(METRIC_DIAPERS),
            ),
            BabyDiaryCountSensor(
                store,
                baby_name,
                "daily_xixi",
                f"Daily Xixis {baby_name} Counter",
                "baby:xixi",
                lambda data: data.daily(METRIC_XIXI),
            ),
            BabyDiaryCountSensor(
                store,
                baby_name,
                "daily_coco",
                f"Daily Cocos {baby_name} Counter",
                "baby:coco",
                lambda data: data.daily(METRIC_COCO),
            ),
        ]
    )


class BabyDiaryCountSensor(SensorEntity):
    """Baby Diary count sensor."""

    _attr_native_unit_of_measurement = "changes"
    _attr_should_poll = False
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 0

    def __init__(
        self,
        store: BabyDiaryStore,
        baby_name: str,
        key: str,
        name: str,
        icon: str,
        value: Callable[[BabyDiaryStore], int],
    ) -> None:
        self._store = store
        self._value = value
        self._attr_name = name
        self._attr_unique_id = f"{store.entry.entry_id}_{key}"
        self._attr_icon = icon
        self._attr_device_info = store.device_info

    @property
    def native_value(self) -> int:
        """Return the sensor value."""
        return self._value(self._store)

    async def async_added_to_hass(self) -> None:
        """Register update listener."""
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, self._store.signal, self._async_handle_update
            )
        )

    @callback
    def _async_handle_update(self) -> None:
        self.async_write_ha_state()
