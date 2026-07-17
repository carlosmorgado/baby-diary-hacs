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

If the dashboard card cannot find the generated entity IDs, pass the entities explicitly:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.daily_fraldas_goncalo_counter
  xixi: sensor.daily_xixis_goncalo_counter
  coco: sensor.daily_cocos_goncalo_counter
```

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
