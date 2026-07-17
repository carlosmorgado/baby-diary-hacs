# Icons And Colors

The Baby Diary integration loads the `baby:` iconset automatically.

No dashboard resource is needed. The iconset is registered by `custom_components/baby_diary/frontend/baby-diary.js` when the integration is loaded.

## Icons

| Meaning | Primary | Aliases |
| --- | --- | --- |
| App / diary | `baby:app` | `baby:diary`, `baby:baby-diary` |
| Diaper / fralda | `baby:diaper` | `baby:fralda` |
| Pee / xixi | `baby:xixi` | `baby:pee` |
| Poo / coco | `baby:coco` | `baby:poo` |
| Both / ambos | `baby:ambos` | `baby:both` |
| Feeding / mamada | `baby:mamada` | `baby:feeding` |

## Colors

| Token | Hex |
| --- | --- |
| `app` | `#F8FAFC` |
| `diaper` | `#CBD5E1` |
| `xixi` | `#FACC15` |
| `coco` | `#92400E` |
| `ambos` | `#A855F7` |
| `mamada` | `#F9A8D4` |
| `mint` | `#6EE7B7` |

The palette is available in the browser as:

```js
window.babyDiaryHacs.colors
```

## Runtime Source

The runtime icon paths and palette live in `custom_components/baby_diary/frontend/baby-diary.js`.

Home Assistant iconsets are monochrome by design, so `baby:` icons use the current Home Assistant icon color.

## Example

```yaml
type: tile
entity: sensor.baby_diary_goncalo_daily_fraldas_goncalo_counter
name: Fraldas
icon: baby:diaper
color: white
```
