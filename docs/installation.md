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

## Removing

1. Remove each Baby Diary entry from **Settings > Devices & services**.
2. Remove the HACS integration.
3. Restart Home Assistant if requested.

Removing the integration stops the entities and frontend card from loading. Home Assistant may keep historical recorder data according to your recorder settings.
