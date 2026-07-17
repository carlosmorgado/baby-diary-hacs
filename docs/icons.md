# Icons And Colors

The Baby Diary integration loads the `baby:` iconset automatically.

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

## Assets

Colored SVG design assets live in [assets](../assets). They are for documentation, previews, and reuse outside the Home Assistant iconset.

Home Assistant iconsets are monochrome by design, so `baby:` icons use the current Home Assistant icon color.
