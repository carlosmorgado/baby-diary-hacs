# Dashboard Card

Baby Diary includes two custom cards:

```yaml
type: custom:baby-diary-diaper-card
```

```yaml
type: custom:baby-diary-feeding-card
```

The diaper card builds a Home Assistant grid with:

- daily diaper total
- daily xixi total
- daily coco total
- native Home Assistant trend graphs
- quick buttons for Xixi, Coco, and Ambos

The feeding card builds a themed Baby Diary card with:

- today's feeding count
- today's total feeding duration
- a timeline of today's completed feeding sessions
- the active feeding session when one is running
- one button that starts or stops the feeding session

Clicking the timeline opens the Home Assistant more-info/history dialog for the daily feeding sensor. The active feeding duration is refreshed every second in the card and can show seconds, minutes, and hours.

No manual dashboard resource is needed. The integration registers the frontend module when at least one Baby Diary config entry is loaded.

## Basic Example

When you have one Baby Diary baby configured, this is enough:

```yaml
type: custom:baby-diary-diaper-card
```

```yaml
type: custom:baby-diary-feeding-card
```

Both cards auto-detect the generated Baby Diary entities when only one baby exists.

## Multiple Babies

Use the same baby name or slug that you used when adding the integration:

```yaml
type: custom:baby-diary-diaper-card
baby: maria
```

```yaml
type: custom:baby-diary-feeding-card
baby: maria
```

The cards first check the normal generated Baby Diary entities and then fall back to matching Home Assistant's generated entity IDs. This covers names like:

```text
sensor.baby_diary_maria_daily_fraldas_maria_counter
sensor.baby_diary_maria_daily_xixis_maria_counter
sensor.baby_diary_maria_daily_cocos_maria_counter
sensor.baby_diary_maria_daily_mamadas_maria_counter
sensor.baby_diary_maria_current_mamada_maria_duration
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

```yaml
type: custom:baby-diary-feeding-card
baby: goncalo
entities:
  feedings: sensor.baby_diary_goncalo_daily_mamadas_goncalo_counter
  currentDuration: sensor.baby_diary_goncalo_current_mamada_goncalo_duration
```

## Service Override

By default, the buttons call `baby_diary.log_diaper_change`.

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
service: baby_diary.log_diaper_change
```

By default, the feeding card button calls `baby_diary.toggle_feeding`.

```yaml
type: custom:baby-diary-feeding-card
baby: goncalo
service: baby_diary.toggle_feeding
```

You can also pass an `entry_id` if you want the buttons to target a specific config entry instead of routing by baby name:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entry_id: 01J2EXAMPLEENTRYID
```

```yaml
type: custom:baby-diary-feeding-card
baby: goncalo
entry_id: 01J2EXAMPLEENTRYID
```

## What The Card Generates

The diaper card wraps native Home Assistant `tile`, `grid`, and `button` cards. It uses nested grids so the diaper tile spans the full card width, xixi and coco sit side by side, and the three logging buttons share the full card width. The wrapper resolves Baby Diary's generated entity IDs before passing them into the native cards, which avoids broken `Entity not found` tiles when Home Assistant creates longer entity IDs.

The feeding card uses one `ha-card` and the active Home Assistant theme. It reads the daily feeding sensor's `sessions` attribute to draw the timeline, so the chart can show both when feedings happened and how long each feeding lasted.

## Entity Not Found

If the card cannot find the daily entities, it shows a setup message instead of rendering broken entity cards.

Check that:

- Baby Diary is installed through HACS.
- Home Assistant was restarted after install or update.
- A Baby Diary baby exists under **Settings > Devices & services > Baby Diary**.
- The card has the right `baby` value if you track more than one baby.

For renamed entities, use the `entities` override shown above.
