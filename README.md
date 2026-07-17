# Baby Diary HACS

Baby Diary HACS is a Home Assistant custom integration for baby care tracking.

Install it once per baby. Each Baby Diary entry creates the diaper sensors, daily sensors, quick log buttons, iconset, and dashboard card needed for that baby.

## Install

Quick link: [Open this repository in HACS](https://my.home-assistant.io/redirect/hacs_repository/?owner=carlosmorgado&repository=baby-diary-hacs&category=integration)

1. In HACS, add this repository as a custom repository.
2. Choose the **Integration** category.
3. Install **Baby Diary HACS**.
4. Restart Home Assistant.
5. Go to **Settings > Devices & services > Add integration**.
6. Add **Baby Diary** and enter the baby's name.

No `configuration.yaml`, dashboard resources, template sensors, utility meters, or scripts are needed.

## Created Entities

For a baby named `Goncalo`, the integration creates:

```text
sensor.fraldas_goncalo_counter_sensor
sensor.xixis_goncalo_counter_sensor
sensor.cocos_goncalo_counter_sensor
sensor.daily_fraldas_goncalo_counter
sensor.daily_xixis_goncalo_counter
sensor.daily_cocos_goncalo_counter
button.log_xixi_goncalo
button.log_coco_goncalo
button.log_ambos_goncalo
```

`ambos` increments xixi and coco, but only one diaper.

## Dashboard Card

Add this card to a dashboard:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
```

The card renders the daily diaper, xixi, and coco totals with trend graphs plus quick buttons for Xixi, Coco, and Ambos.

If your entity names differ, override them:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.daily_fraldas_goncalo_counter
  xixi: sensor.daily_xixis_goncalo_counter
  coco: sensor.daily_cocos_goncalo_counter
```

For multiple babies, set `baby` to the same name or slug used by that Baby Diary integration entry.

## Action

The integration also exposes an action:

```yaml
action: baby_diary.log_diaper_change
data:
  baby_name: Goncalo
  type: xixi
```

`type` can be `xixi`, `coco`, or `ambos`. `baby_name` is optional when only one Baby Diary entry exists.

You can also use the generated buttons directly in automations or dashboards:

```yaml
action: button.press
target:
  entity_id: button.log_xixi_goncalo
```

## Icons And Colors

The integration automatically loads the `baby:` iconset:

```yaml
icon: baby:app
icon: baby:diaper
icon: baby:xixi
icon: baby:coco
icon: baby:ambos
icon: baby:mamada
```

The browser also receives the Baby Diary palette at `window.babyDiaryHacs.colors`.

See [docs/icons.md](docs/icons.md) for the full icon, alias, color, and asset reference.

## Repository Layout

```text
custom_components/baby_diary/  Home Assistant integration runtime
assets/                        Colored SVG design assets
brand/                         HACS repository brand icon
docs/                          Short reference docs
```

The integration runtime, including the frontend card/iconset module, lives under `custom_components/baby_diary/`.
