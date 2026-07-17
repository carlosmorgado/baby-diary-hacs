# Dashboard Card

Baby Diary includes a custom card:

```yaml
type: custom:baby-diary-diaper-card
```

The card builds a Home Assistant grid with:

- daily diaper total
- daily xixi total
- daily coco total
- native Home Assistant trend graphs
- quick buttons for Xixi, Coco, and Ambos

No manual dashboard resource is needed. The integration registers the frontend module when at least one Baby Diary config entry is loaded.

## Basic Example

When you have one Baby Diary baby configured, this is enough:

```yaml
type: custom:baby-diary-diaper-card
```

The card auto-detects the generated daily diaper entities.

## Multiple Babies

Use the same baby name or slug that you used when adding the integration:

```yaml
type: custom:baby-diary-diaper-card
baby: maria
```

The card first checks the normal generated Baby Diary entities and then falls back to matching Home Assistant's generated entity IDs. This covers names like:

```text
sensor.baby_diary_maria_daily_fraldas_maria_counter
sensor.baby_diary_maria_daily_xixis_maria_counter
sensor.baby_diary_maria_daily_cocos_maria_counter
```

If the generated entity IDs were renamed, use entity overrides.

## Entity Overrides

If Home Assistant created different entity IDs, pass them explicitly:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.baby_diary_goncalo_daily_fraldas_goncalo_counter
  xixi: sensor.baby_diary_goncalo_daily_xixis_goncalo_counter
  coco: sensor.baby_diary_goncalo_daily_cocos_goncalo_counter
```

## Service Override

By default, the buttons call `baby_diary.log_diaper_change`.

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
service: baby_diary.log_diaper_change
```

You can also pass an `entry_id` if you want the buttons to target a specific config entry instead of routing by baby name:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entry_id: 01J2EXAMPLEENTRYID
```

## What The Card Generates

The custom card wraps native Home Assistant `tile`, `grid`, and `button` cards. The diaper tile spans the full card width, xixi and coco sit side by side, and the three logging buttons sit in a square action row. The wrapper resolves Baby Diary's generated entity IDs before passing them into the native cards, which avoids broken `Entity not found` tiles when Home Assistant creates longer entity IDs.

## Entity Not Found

If the card cannot find the daily entities, it shows a setup message instead of rendering broken entity cards.

Check that:

- Baby Diary is installed through HACS.
- Home Assistant was restarted after install or update.
- A Baby Diary baby exists under **Settings > Devices & services > Baby Diary**.
- The card has the right `baby` value if you track more than one baby.

For renamed entities, use the `entities` override shown above.
