"""Baby Diary sensors."""

from __future__ import annotations

from collections.abc import Callable
from datetime import timedelta
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfTime
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_interval

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
            BabyDiarySensor(
                store,
                "total_diapers",
                f"Fraldas {baby_name} Counter Sensor",
                "baby:diaper",
                lambda data: data.total(METRIC_DIAPERS),
                unit="mudas",
            ),
            BabyDiarySensor(
                store,
                "total_xixi",
                f"Xixis {baby_name} Counter Sensor",
                "baby:xixi",
                lambda data: data.total(METRIC_XIXI),
                unit="mudas",
            ),
            BabyDiarySensor(
                store,
                "total_coco",
                f"Cocos {baby_name} Counter Sensor",
                "baby:coco",
                lambda data: data.total(METRIC_COCO),
                unit="mudas",
            ),
            BabyDiarySensor(
                store,
                "daily_diapers",
                f"Daily Fraldas {baby_name} Counter",
                "baby:diaper",
                lambda data: data.daily(METRIC_DIAPERS),
                unit="mudas",
            ),
            BabyDiarySensor(
                store,
                "daily_xixi",
                f"Daily Xixis {baby_name} Counter",
                "baby:xixi",
                lambda data: data.daily(METRIC_XIXI),
                unit="mudas",
            ),
            BabyDiarySensor(
                store,
                "daily_coco",
                f"Daily Cocos {baby_name} Counter",
                "baby:coco",
                lambda data: data.daily(METRIC_COCO),
                unit="mudas",
            ),
            BabyDiarySensor(
                store,
                "total_feedings",
                f"Mamadas {baby_name} Counter Sensor",
                "baby:mamada",
                lambda data: data.total_feeding_count(),
                unit="mamadas",
            ),
            BabyDiarySensor(
                store,
                "daily_feedings",
                f"Daily Mamadas {baby_name} Counter",
                "baby:mamada",
                lambda data: data.daily_feeding_count(),
                unit="mamadas",
                attributes=_feeding_summary_attributes,
            ),
            BabyDiarySensor(
                store,
                "daily_feeding_duration",
                f"Daily Mamada {baby_name} Duration",
                "baby:mamada",
                lambda data: _seconds_to_minutes(data.daily_feeding_duration_seconds()),
                unit=UnitOfTime.MINUTES,
                device_class=SensorDeviceClass.DURATION,
            ),
            BabyDiarySensor(
                store,
                "last_feeding_duration",
                f"Last Mamada {baby_name} Duration",
                "baby:mamada",
                lambda data: _seconds_to_minutes(data.last_feeding_duration_seconds()),
                unit=UnitOfTime.MINUTES,
                device_class=SensorDeviceClass.DURATION,
            ),
            BabyDiaryCurrentFeedingDurationSensor(
                store,
                "current_feeding_duration",
                f"Current Mamada {baby_name} Duration",
                "baby:mamada",
                lambda data: _seconds_to_minutes(data.feeding_elapsed_seconds()),
                unit=UnitOfTime.MINUTES,
                device_class=SensorDeviceClass.DURATION,
                attributes=_current_feeding_attributes,
            ),
        ]
    )


class BabyDiarySensor(SensorEntity):
    """Baby Diary sensor."""

    _attr_should_poll = False
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 0

    def __init__(
        self,
        store: BabyDiaryStore,
        key: str,
        name: str,
        icon: str,
        value: Callable[[BabyDiaryStore], int],
        *,
        unit: str | None = None,
        device_class: SensorDeviceClass | None = None,
        attributes: Callable[[BabyDiaryStore], dict[str, Any]] | None = None,
    ) -> None:
        self._store = store
        self._value = value
        self._attributes = attributes
        self._attr_name = name
        self._attr_unique_id = f"{store.entry.entry_id}_{key}"
        self._attr_icon = icon
        self._attr_device_info = store.device_info
        self._attr_native_unit_of_measurement = unit
        self._attr_device_class = device_class

    @property
    def native_value(self) -> int:
        """Return the sensor value."""
        return self._value(self._store)

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        if self._attributes is None:
            return None

        return self._attributes(self._store)

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


class BabyDiaryCurrentFeedingDurationSensor(BabyDiarySensor):
    """Sensor that refreshes while a feeding session is active."""

    async def async_added_to_hass(self) -> None:
        """Register update listeners."""
        await super().async_added_to_hass()
        self.async_on_remove(
            async_track_time_interval(
                self.hass, self._async_handle_interval, timedelta(minutes=1)
            )
        )

    @callback
    def _async_handle_interval(self, _now: Any) -> None:
        if self._store.feeding_active:
            self.async_write_ha_state()


def _feeding_summary_attributes(store: BabyDiaryStore) -> dict[str, Any]:
    return {
        "duration_seconds": store.daily_feeding_duration_seconds(),
        "duration_minutes": _seconds_to_minutes(store.daily_feeding_duration_seconds()),
        "last_duration_seconds": store.last_feeding_duration_seconds(),
        "last_duration_minutes": _seconds_to_minutes(
            store.last_feeding_duration_seconds()
        ),
        "active": store.feeding_active,
        "active_started_at": _datetime_to_iso(store.feeding_started_at),
        "active_duration_seconds": store.feeding_elapsed_seconds(),
        "active_duration_minutes": _seconds_to_minutes(store.feeding_elapsed_seconds()),
        "sessions": [
            {
                "started_at": session["started_at"],
                "ended_at": session["ended_at"],
                "duration_seconds": session["duration_seconds"],
                "duration_minutes": _seconds_to_minutes(session["duration_seconds"]),
            }
            for session in store.daily_feeding_sessions()
        ],
    }


def _current_feeding_attributes(store: BabyDiaryStore) -> dict[str, Any]:
    return {
        "active": store.feeding_active,
        "started_at": _datetime_to_iso(store.feeding_started_at),
        "duration_seconds": store.feeding_elapsed_seconds(),
    }


def _seconds_to_minutes(seconds: int) -> int:
    if seconds <= 0:
        return 0

    return max(1, (seconds + 59) // 60)


def _datetime_to_iso(value: Any) -> str | None:
    if value is None:
        return None

    return value.isoformat()
