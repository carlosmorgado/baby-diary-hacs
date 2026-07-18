# Installation

Baby Diary is installed as a HACS custom integration.

## HACS

Quick link: [Open this repository in HACS](https://my.home-assistant.io/redirect/hacs_repository/?owner=carlosmorgado&repository=baby-diary-hacs&category=integration)

Manual HACS steps:

1. Open **HACS**.
2. Open the menu and choose **Custom repositories**.
3. Add this repository URL:

   ```text
   https://github.com/carlosmorgado/baby-diary-hacs
   ```

4. Select **Integration** as the category.
5. Install **Baby Diary HACS**.
6. Restart Home Assistant.

## Add A Baby

1. Go to **Settings > Devices & services**.
2. Select **Add integration**.
3. Search for **Baby Diary**.
4. Enter the baby's name.

The baby name is used to create stable entity names and to route service calls when you track more than one baby.

## Multiple Babies

Add the integration once per baby.

For example, two entries named `Goncalo` and `Maria` create separate sensors, buttons, and stored counters. When calling `baby_diary.log_diaper_change`, pass `baby_name` if more than one baby exists.

## Manual Install

HACS is recommended. For a manual install:

1. Copy `custom_components/baby_diary/` into your Home Assistant `custom_components/` directory.
2. Restart Home Assistant.
3. Add the integration from **Settings > Devices & services**.

Manual installs do not get HACS update notifications.

## Updating

1. Update through HACS.
2. Restart Home Assistant if HACS asks you to.

The counters are stored in Home Assistant's `.storage` directory and are not replaced by normal integration updates.

Backend changes, such as sensors, units, services, storage, or config flows, need a Home Assistant restart so Python code is loaded again. Frontend-only card/icon changes usually only need the HACS download plus a hard browser refresh, as long as Home Assistant is already serving the Baby Diary frontend module.

The integration also keeps `/baby_diary/baby-diary.js?v=<version>` registered as a Lovelace module resource. That helps Home Assistant load the custom card before dashboards render and reduces intermittent `custom element does not exist` errors after updates.

## Removing

Use this order when you want a clean uninstall:

1. Go to **Settings > Devices & services**.
2. Open **Baby Diary**.
3. Delete each Baby Diary entry/baby.
4. Go to **HACS**.
5. Open **Baby Diary HACS** and uninstall it.
6. Restart Home Assistant if requested.

Deleting a Baby Diary entry removes its persisted Baby Diary counter storage. Home Assistant may still keep historical recorder/statistics data according to your recorder settings.

## Reinstalling After Removing It From HACS

If you removed the HACS package before deleting the Baby Diary integration entry:

1. Install **Baby Diary HACS** again from HACS.
2. Restart Home Assistant.
3. Remove the Baby Diary entry from **Settings > Devices & services**.
4. Uninstall **Baby Diary HACS** from HACS.
5. Restart Home Assistant.

That gives Home Assistant the integration code again long enough to cleanly unload and remove the config entry.
