# Troubleshooting

## HACS Does Not Show The Integration

Check that the custom repository was added as category **Integration**, not plugin or theme.

Repository URL:

```text
https://github.com/carlosmorgado/baby-diary-hacs
```

## The Card Type Is Not Found

If Home Assistant says `custom:baby-diary-diaper-card` was not found:

1. Confirm the Baby Diary integration is installed.
2. Confirm at least one Baby Diary config entry exists.
3. Restart Home Assistant.
4. Hard refresh the browser.

The frontend module is loaded by the integration, so you should not need to add a dashboard resource manually.

## Icons Do Not Appear

Use the `baby:` prefix:

```yaml
icon: baby:diaper
```

If icons still do not show, restart Home Assistant and hard refresh the browser. The iconset is registered by the same frontend module as the custom card.

## Entity IDs Are Different

Home Assistant can change entity IDs when names collide or when an entity was renamed. Check **Settings > Devices & services > Entities** and search for the baby name.

The dashboard card auto-detects entities when exactly one Baby Diary baby exists. If it still cannot find the generated entity IDs, pass the entities explicitly:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.baby_diary_goncalo_daily_fraldas_goncalo_counter
  xixi: sensor.baby_diary_goncalo_daily_xixis_goncalo_counter
  coco: sensor.baby_diary_goncalo_daily_cocos_goncalo_counter
```

## Dashboard Shows Entity Not Found

Update to Baby Diary HACS `0.3.6` or newer. Older versions could render native Home Assistant `Entity not found` cards when the baby name or entity IDs did not match.

After updating:

1. Restart Home Assistant.
2. Hard refresh the browser or fully close and reopen the Home Assistant app.
3. Confirm **Settings > Devices & services > Baby Diary** has one configured baby.
4. If you have more than one baby, set `baby` in the card YAML.
5. If the entities were renamed, use explicit `entities` overrides.

Version `0.3.6` also removes stale Baby Diary frontend module URLs from older releases. This matters because an older loaded module can define the custom card first and keep showing the old broken layout until Home Assistant and the browser are refreshed.

## Service Call Fails With Multiple Babies

When more than one Baby Diary entry exists, pass `baby_name`:

```yaml
action: baby_diary.log_diaper_change
data:
  baby_name: Goncalo
  type: ambos
```

This avoids logging the diaper to the wrong baby.

## Daily Counters Did Not Reset

Daily counters reset shortly after local Home Assistant midnight.

Check:

- Home Assistant's configured time zone
- whether Home Assistant was running at midnight
- whether the integration entry is loaded

If Home Assistant was off at midnight, the store also checks the date when values are loaded or read and will roll over when it notices a new day.

## Counters Reset After Reinstall

Normal HACS updates should not reset counters. The data is stored by Home Assistant's storage helper under `.storage`.

Removing Home Assistant storage files, deleting the config entry, or restoring an old backup can change the counters.

## Uninstalled From HACS Before Removing The Integration Entry

If the HACS package was removed first, Home Assistant may still have a Baby Diary config entry but no integration code to load it.

Fix it by reinstalling the HACS package, restarting Home Assistant, deleting the Baby Diary entry from **Settings > Devices & services**, and then uninstalling the HACS package again.

This order lets Home Assistant call Baby Diary's removal hook so the persisted counter storage can be cleaned up.
