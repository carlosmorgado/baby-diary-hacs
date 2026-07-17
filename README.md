# Baby Diary HACS

![Baby Diary icon](brand/icon.png)

[![HACS custom repository](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://www.hacs.xyz/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2025.1%2B-41BDF5.svg)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Baby Diary HACS is a Home Assistant custom integration for baby care tracking.

Install it once per baby. Each Baby Diary entry creates diaper and feeding entities, daily counters, quick action buttons, the Baby Diary iconset, and ready-to-use dashboard cards for that baby.

## Features

- No `configuration.yaml`, template sensors, utility meters, scripts, or dashboard resources required.
- One config entry per baby, with per-baby entities and storage.
- Diaper logging for `xixi`, `coco`, and `ambos`.
- `ambos` increments xixi and coco, but still counts as one diaper.
- Total and daily sensors.
- Feeding sessions with one start/stop action.
- Daily feeding count, duration, and session timeline attributes.
- Daily reset at local Home Assistant midnight.
- Quick log button entities for dashboards, automations, NFC tags, and voice helpers.
- Custom dashboard card: `custom:baby-diary-diaper-card`.
- Custom dashboard card: `custom:baby-diary-feeding-card`.
- Custom iconset: `baby:`.
- HACS-compatible repository layout and brand icons.

## Requirements

- Home Assistant `2025.1.0` or newer.
- HACS installed.
- A browser dashboard if you want to use the custom card or `baby:` icons.

## Install

Quick link: [Open this repository in HACS](https://my.home-assistant.io/redirect/hacs_repository/?owner=carlosmorgado&repository=baby-diary-hacs&category=integration)

1. In HACS, add this repository as a custom repository.
2. Choose the **Integration** category.
3. Install **Baby Diary HACS**.
4. Restart Home Assistant.
5. Go to **Settings > Devices & services > Add integration**.
6. Add **Baby Diary** and enter the baby's name.

More details are available in [docs/installation.md](docs/installation.md).

## Uninstall

For a clean uninstall, remove each Baby Diary entry from **Settings > Devices & services** before uninstalling the package from HACS.

The integration removes its persisted Baby Diary counter storage when a Baby Diary entry is deleted. Home Assistant recorder/history data may remain according to your recorder settings.

## Created Entities

For a baby named `Goncalo`, Home Assistant will create entities similar to these:

| Entity | Purpose |
| --- | --- |
| `sensor.fraldas_goncalo_counter_sensor` | Lifetime diaper total |
| `sensor.xixis_goncalo_counter_sensor` | Lifetime xixi total |
| `sensor.baby_diary_goncalo_cocos_goncalo_counter_sensor` | Lifetime coco total |
| `sensor.baby_diary_goncalo_daily_fraldas_goncalo_counter` | Today's diaper total |
| `sensor.baby_diary_goncalo_daily_xixis_goncalo_counter` | Today's xixi total |
| `sensor.baby_diary_goncalo_daily_cocos_goncalo_counter` | Today's coco total |
| `sensor.baby_diary_goncalo_daily_mamadas_goncalo_counter` | Today's feeding count |
| `sensor.baby_diary_goncalo_current_mamada_goncalo_duration` | Current feeding duration |
| `sensor.baby_diary_goncalo_daily_mamada_goncalo_duration` | Today's total feeding duration |
| `sensor.baby_diary_goncalo_last_mamada_goncalo_duration` | Last completed feeding duration |
| `button.log_xixi_goncalo` | Log one xixi diaper |
| `button.log_coco_goncalo` | Log one coco diaper |
| `button.log_ambos_goncalo` | Log one diaper with xixi and coco |
| `button.toggle_mamada_goncalo` | Start or stop a feeding session |

Entity IDs can vary if Home Assistant has to avoid a duplicate name or if you rename entities in the entity registry. The dashboard card tries to detect these generated IDs automatically.

## Dashboard Card

Add the diaper card to a dashboard:

```yaml
type: custom:baby-diary-diaper-card
```

The card renders the daily diaper, xixi, and coco totals with native Home Assistant trend graphs plus quick buttons for Xixi, Coco, and Ambos.

Add the feeding card to a dashboard:

```yaml
type: custom:baby-diary-feeding-card
```

The feeding card renders today's feeding count, total feeding duration, a session timeline, and one button that starts the feeding if none is active or stops the active feeding.

When only one Baby Diary baby exists, the card can auto-detect the entities. If you track more than one baby, pass `baby`.

See [docs/dashboard-card.md](docs/dashboard-card.md) for all card options, custom entity overrides, and examples.

## Action

The integration exposes diaper and feeding actions:

```yaml
action: baby_diary.log_diaper_change
data:
  baby_name: Goncalo
  type: xixi
```

`type` can be `xixi`, `coco`, or `ambos`. `baby_name` is optional when only one Baby Diary entry exists.

```yaml
action: baby_diary.toggle_feeding
data:
  baby_name: Goncalo
```

`toggle_feeding` starts a feeding session when none is active and stops the active feeding session when one is already running.

See [docs/services-and-automations.md](docs/services-and-automations.md) for automation and button examples.

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

The browser also receives the Baby Diary palette at:

```js
window.babyDiaryHacs.colors
```

See [docs/icons.md](docs/icons.md) for the full icon, alias, and color reference.

## Documentation

- [Installation](docs/installation.md)
- [Dashboard card](docs/dashboard-card.md)
- [Services and automations](docs/services-and-automations.md)
- [Icons and colors](docs/icons.md)
- [Python files explained](docs/python-files.md)
- [Project structure](docs/project-structure.md)
- [Troubleshooting](docs/troubleshooting.md)

## Frontend Runtime

The integration ships one frontend module at `custom_components/baby_diary/frontend/baby-diary.js`.

That file is necessary because Home Assistant needs browser-side JavaScript to register:

- `custom:baby-diary-diaper-card`
- `custom:baby-diary-feeding-card`
- the `baby:` custom iconset
- `window.babyDiaryHacs.colors`

The icons and colors live in that frontend module so the integration has one runtime source of truth. A root `assets/` folder would not be a reliable runtime source for a HACS integration install, and keeping separate SVG/CSS copies created duplication.

## Brand Icons

Two identical brand PNGs are intentionally kept:

- `brand/icon.png` is used by HACS for the repository listing.
- `custom_components/baby_diary/brand/icon.png` is used by Home Assistant for the installed integration UI.

This mirrors the split between HACS repository metadata and the installed Home Assistant integration runtime.

## Development

Run the local checks before opening or updating a pull request:

```powershell
npm run check
python -m compileall custom_components\baby_diary
git diff --check
```

This repository follows the HACS integration layout: all runtime files live under `custom_components/baby_diary/`.

## References

- [HACS general requirements](https://www.hacs.xyz/docs/publish/start/)
- [HACS integration requirements](https://www.hacs.xyz/docs/publish/integration/)
- [Home Assistant config flow docs](https://developers.home-assistant.io/docs/core/integration/config_flow/)
- [Home Assistant custom integration localization](https://developers.home-assistant.io/docs/internationalization/custom_integration/)
