# Baby Diary HACS

Baby Diary HACS provides the Home Assistant integration, dashboard card, iconset, and color palette used by the Baby Diary app for baby care tracking.

It includes:

- A YAML-free Baby Diary integration.
- A `baby_diary.log_diaper_change` action for diaper logging.
- Daily and total diaper sensors for Fraldas, Xixis, and Cocos.
- A reusable `custom:baby-diary-diaper-card` dashboard card.
- Icons for app / diary, diaper / fralda, pee / xixi, poo / coco, both / ambos, and feeding / mamada.

Control icons such as edit, delete, plus, theme, and navigation are intentionally not included.

## HACS install

1. In HACS, add this repository as a custom repository.
2. Choose the **Integration** category.
3. Install **Baby Diary HACS**.
4. Restart Home Assistant.
5. Go to **Settings > Devices & services > Add integration** and add **Baby Diary**.
6. Enter the baby's name. Use `Goncalo` if you want entity IDs matching the examples below.

That is enough for the normal HACS flow. The integration registers the frontend module automatically, so no `configuration.yaml` or dashboard resource entry is required.

The integration creates these entities for a baby named `Goncalo`:

- `sensor.fraldas_goncalo_counter_sensor`
- `sensor.xixis_goncalo_counter_sensor`
- `sensor.cocos_goncalo_counter_sensor`
- `sensor.daily_fraldas_goncalo_counter`
- `sensor.daily_xixis_goncalo_counter`
- `sensor.daily_cocos_goncalo_counter`

It also registers:

```yaml
action: baby_diary.log_diaper_change
data:
  type: xixi
```

`type` can be `xixi`, `coco`, or `ambos`. `ambos` increments xixi and coco, but only one diaper.

## Dashboard card

Add this card to a dashboard:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
```

For a baby named `Goncalo`, this expands to the same tile/button layout as the longer YAML version: daily Fraldas, Xixis, and Cocos tiles with trend graphs, plus quick buttons for Xixi, Coco, and Ambos.

You can override the generated entities:

```yaml
type: custom:baby-diary-diaper-card
baby: goncalo
entities:
  diapers: sensor.daily_fraldas_goncalo_counter
  xixi: sensor.daily_xixis_goncalo_counter
  coco: sensor.daily_cocos_goncalo_counter
```

If you add multiple Baby Diary entries, also set `entry_id` on the card so button taps know which baby to update.

## Icons

The icon prefix is `baby`.

```yaml
icon: baby:app
icon: baby:diaper
icon: baby:xixi
icon: baby:coco
icon: baby:ambos
icon: baby:mamada
```

English and Portuguese aliases are available:

- `baby:diaper` and `baby:fralda`
- `baby:xixi` and `baby:pee`
- `baby:coco` and `baby:poo`
- `baby:ambos` and `baby:both`
- `baby:mamada` and `baby:feeding`
- `baby:app`, `baby:diary`, and `baby:baby-diary`

## Colors

The canonical Baby Diary colors are:

| Token | Color |
| --- | --- |
| App | `#F8FAFC` |
| Diaper | `#CBD5E1` |
| Xixi | `#FACC15` |
| Coco | `#92400E` |
| Ambos | `#A855F7` |
| Mamada | `#F9A8D4` |
| Mint accent | `#6EE7B7` |

The palette is also exposed in the browser as `window.babyDiaryHacs.colors`.

## Assets

Colored SVG assets are bundled under `dist/assets`. They are mainly kept for design reuse and manual dashboard artwork.

If this repository is installed as a Dashboard resource, HACS paths look like:

```text
/hacsfiles/baby-diary-hacs/assets/xixi.svg
```

The direct local path also works:

```text
/local/community/baby-diary-hacs/assets/xixi.svg
```

## Home Assistant package example

The old YAML-style package example remains at `dist/packages/baby_diary_icons.yaml`, but it is no longer needed for normal use. Prefer the integration and the `custom:baby-diary-diaper-card`.

