# Dashboard Card

Baby Diary includes a custom card:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
```

The card builds a Home Assistant grid with:

- daily diaper total
- daily xixi total
- daily coco total
- trend graphs
- quick buttons for Xixi, Coco, and Ambos

No manual dashboard resource is needed. The integration registers the frontend module when at least one Baby Diary config entry is loaded.

## Basic Example

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
```

## Multiple Babies

Use the same baby name or slug that you used when adding the integration:

```yaml
type: custom:baby-diary-diaper-card
baby: maria
```

The card will look for entities named like:

```text
sensor.daily_fraldas_maria_counter
sensor.daily_xixis_maria_counter
sensor.daily_cocos_maria_counter
```

## Entity Overrides

If Home Assistant created different entity IDs, pass them explicitly:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.daily_fraldas_goncalo_counter
  xixi: sensor.daily_xixis_goncalo_counter
  coco: sensor.daily_cocos_goncalo_counter
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

## Label, Icon, And Color Overrides

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
diapers_name: Fraldas
diapers_icon: baby:diaper
diapers_color: white
xixi_name: Xixis
xixi_icon: baby:xixi
xixi_color: yellow
coco_name: Cocos
coco_icon: baby:coco
coco_color: brown
```

## Layout Options

The card exposes the same outer options used by Home Assistant grid cards:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
column_span: 1
background:
  color: primary
  opacity: 20
```

## What The Card Generates

The custom card is a small wrapper around native dashboard cards. It creates a built-in `grid` card containing built-in `tile`, `button`, and trend graph features. This keeps the dashboard easy to customize and avoids maintaining a large custom frontend UI.
