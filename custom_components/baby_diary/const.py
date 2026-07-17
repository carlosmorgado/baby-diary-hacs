"""Constants for Baby Diary."""

from __future__ import annotations

from homeassistant.const import Platform

DOMAIN = "baby_diary"
NAME = "Baby Diary"
VERSION = "0.3.4"

CONF_BABY_NAME = "baby_name"
DEFAULT_BABY_NAME = "Goncalo"

ATTR_ENTRY_ID = "entry_id"
ATTR_TYPE = "type"

DIAPER_XIXI = "xixi"
DIAPER_COCO = "coco"
DIAPER_AMBOS = "ambos"
DIAPER_TYPES = (DIAPER_XIXI, DIAPER_COCO, DIAPER_AMBOS)

METRIC_DIAPERS = "diapers"
METRIC_XIXI = "xixi"
METRIC_COCO = "coco"
METRICS = (METRIC_DIAPERS, METRIC_XIXI, METRIC_COCO)

DATA_STORES = "stores"
DATA_STORE_SLUGS = "store_slugs"
DATA_FRONTEND_REGISTERED = "frontend_registered"

SERVICE_LOG_DIAPER_CHANGE = "log_diaper_change"

SIGNAL_UPDATED = f"{DOMAIN}_updated"

PLATFORMS = [Platform.BUTTON, Platform.SENSOR]
