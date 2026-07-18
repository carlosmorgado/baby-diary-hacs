"""Persistent Baby Diary counters."""

from __future__ import annotations

from collections.abc import Callable
from datetime import datetime
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
    FEEDING_SESSION_LIMIT,
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

    async def async_toggle_feeding(self) -> str:
        """Start or stop a feeding session."""
        if self.feeding_active:
            await self.async_stop_feeding()
            return "stopped"

        await self.async_start_feeding()
        return "started"

    async def async_start_feeding(self) -> None:
        """Start a feeding session."""
        self._rollover_daily()

        if self.feeding_active:
            return

        self._data["feedings"]["active_start"] = dt_util.now().isoformat()
        await self.async_save()
        self.async_update_listeners()

    async def async_stop_feeding(self) -> None:
        """Stop the active feeding session."""
        self._rollover_daily()

        active_start = self.feeding_started_at
        if active_start is None:
            return

        ended_at = dt_util.now()
        duration_seconds = max(1, int((ended_at - active_start).total_seconds()))
        session = {
            "started_at": active_start.isoformat(),
            "ended_at": ended_at.isoformat(),
            "duration_seconds": duration_seconds,
        }

        feedings = self._data["feedings"]
        feedings["active_start"] = None
        feedings["last_duration_seconds"] = duration_seconds
        feedings["totals"]["count"] += 1
        feedings["totals"]["duration_seconds"] += duration_seconds
        feedings["daily"]["count"] += 1
        feedings["daily"]["duration_seconds"] += duration_seconds
        feedings["sessions"] = [*feedings["sessions"], session][-FEEDING_SESSION_LIMIT:]

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

    @property
    def feeding_active(self) -> bool:
        """Return whether a feeding session is active."""
        return self.feeding_started_at is not None

    @property
    def feeding_started_at(self) -> datetime | None:
        """Return the current feeding start time."""
        return self._parse_datetime(self._data["feedings"].get("active_start"))

    @callback
    def feeding_elapsed_seconds(self) -> int:
        """Return active feeding duration in seconds."""
        active_start = self.feeding_started_at
        if active_start is None:
            return 0

        return max(0, int((dt_util.now() - active_start).total_seconds()))

    @callback
    def total_feeding_count(self) -> int:
        """Return total feeding count."""
        self._rollover_daily()
        return int(self._data["feedings"]["totals"]["count"])

    @callback
    def total_feeding_duration_seconds(self) -> int:
        """Return total feeding duration in seconds."""
        self._rollover_daily()
        return int(self._data["feedings"]["totals"]["duration_seconds"])

    @callback
    def daily_feeding_count(self) -> int:
        """Return daily feeding count."""
        self._rollover_daily()
        return int(self._data["feedings"]["daily"]["count"])

    @callback
    def daily_feeding_duration_seconds(self) -> int:
        """Return daily feeding duration in seconds."""
        self._rollover_daily()
        return int(self._data["feedings"]["daily"]["duration_seconds"])

    @callback
    def last_feeding_duration_seconds(self) -> int:
        """Return last completed feeding duration in seconds."""
        self._rollover_daily()
        return int(self._data["feedings"]["last_duration_seconds"])

    @callback
    def daily_feeding_sessions(self) -> list[dict[str, Any]]:
        """Return completed feeding sessions for the current day."""
        self._rollover_daily()
        return list(self._data["feedings"]["sessions"])

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
        self._data["feedings"]["daily"] = self._empty_feeding_counts()
        self._data["feedings"]["sessions"] = []
        return True

    def _normalize(self, stored: dict[str, Any]) -> dict[str, Any]:
        totals = {**self._empty_counts(), **stored.get("totals", {})}
        daily = {**self._empty_counts(), **stored.get("daily", {})}
        feedings = self._normalize_feedings(stored.get("feedings", {}))
        return {
            "daily_date": stored.get("daily_date") or dt_util.now().date().isoformat(),
            "totals": {metric: int(totals.get(metric, 0)) for metric in METRICS},
            "daily": {metric: int(daily.get(metric, 0)) for metric in METRICS},
            "feedings": feedings,
        }

    def _empty_data(self) -> dict[str, Any]:
        return {
            "daily_date": dt_util.now().date().isoformat(),
            "totals": self._empty_counts(),
            "daily": self._empty_counts(),
            "feedings": self._empty_feedings(),
        }

    @staticmethod
    def _empty_counts() -> dict[str, int]:
        return {metric: 0 for metric in METRICS}

    @staticmethod
    def _empty_feeding_counts() -> dict[str, int]:
        return {"count": 0, "duration_seconds": 0}

    def _empty_feedings(self) -> dict[str, Any]:
        return {
            "active_start": None,
            "last_duration_seconds": 0,
            "totals": self._empty_feeding_counts(),
            "daily": self._empty_feeding_counts(),
            "sessions": [],
        }

    def _normalize_feedings(self, stored: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(stored, dict):
            stored = {}

        feedings = {**self._empty_feedings(), **stored}
        stored_totals = feedings.get("totals", {})
        stored_daily = feedings.get("daily", {})
        if not isinstance(stored_totals, dict):
            stored_totals = {}
        if not isinstance(stored_daily, dict):
            stored_daily = {}

        totals = {
            **self._empty_feeding_counts(),
            **stored_totals,
        }
        daily = {
            **self._empty_feeding_counts(),
            **stored_daily,
        }

        return {
            "active_start": self._normalize_datetime_value(feedings.get("active_start")),
            "last_duration_seconds": self._to_int(
                feedings.get("last_duration_seconds", 0)
            ),
            "totals": {
                "count": self._to_int(totals.get("count", 0)),
                "duration_seconds": self._to_int(totals.get("duration_seconds", 0)),
            },
            "daily": {
                "count": self._to_int(daily.get("count", 0)),
                "duration_seconds": self._to_int(daily.get("duration_seconds", 0)),
            },
            "sessions": self._normalize_sessions(feedings.get("sessions", [])),
        }

    def _normalize_sessions(self, sessions: Any) -> list[dict[str, Any]]:
        if not isinstance(sessions, list):
            return []

        normalized: list[dict[str, Any]] = []
        for session in sessions:
            if not isinstance(session, dict):
                continue

            started_at = self._normalize_datetime_value(session.get("started_at"))
            ended_at = self._normalize_datetime_value(session.get("ended_at"))
            duration_seconds = self._to_int(session.get("duration_seconds", 0))

            if started_at and ended_at and duration_seconds > 0:
                normalized.append(
                    {
                        "started_at": started_at,
                        "ended_at": ended_at,
                        "duration_seconds": duration_seconds,
                    }
                )

        return normalized[-FEEDING_SESSION_LIMIT:]

    def _normalize_datetime_value(self, value: Any) -> str | None:
        parsed = self._parse_datetime(value)
        if parsed is None:
            return None

        return parsed.isoformat()

    @staticmethod
    def _parse_datetime(value: Any) -> datetime | None:
        if not value:
            return None

        parsed = dt_util.parse_datetime(str(value))
        if parsed is None:
            return None

        if parsed.tzinfo is None:
            return dt_util.as_local(parsed)

        return parsed

    @staticmethod
    def _to_int(value: Any) -> int:
        try:
            return int(value)
        except (TypeError, ValueError):
            return 0
