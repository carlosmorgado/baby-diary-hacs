# Home Assistant integration

The preferred setup is now the Baby Diary custom integration under `custom_components/baby_diary`.

Install the repository in HACS as an **Integration**, restart Home Assistant, and add **Baby Diary** from **Settings > Devices & services**.

For a baby named `Goncalo`, the integration creates:

- `sensor.fraldas_goncalo_counter_sensor`
- `sensor.xixis_goncalo_counter_sensor`
- `sensor.cocos_goncalo_counter_sensor`
- `sensor.daily_fraldas_goncalo_counter`
- `sensor.daily_xixis_goncalo_counter`
- `sensor.daily_cocos_goncalo_counter`
- `button.log_xixi_goncalo`
- `button.log_coco_goncalo`
- `button.log_ambos_goncalo`

It also creates the action:

```yaml
action: baby_diary.log_diaper_change
data:
  baby_name: Goncalo
  type: xixi
```

`type` can be `xixi`, `coco`, or `ambos`. `baby_name` is optional when only one Baby Diary entry exists.

The old package example is still available at:

```text
dist/packages/baby_diary_icons.yaml
```

It is only intended as a reference or fallback for people who still want YAML helpers.

## Dashboard card

Use the built-in card:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
```

This renders daily diaper tiles with trend graphs and quick log buttons.

You can override entities if your names differ:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.daily_fraldas_goncalo_counter
  xixi: sensor.daily_xixis_goncalo_counter
  coco: sensor.daily_cocos_goncalo_counter
```

