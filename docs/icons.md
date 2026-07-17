# Icons and colors

This package keeps the Baby Diary icon language in one place for Home Assistant.

## Icon names

| Meaning | Primary icon | Aliases |
| --- | --- | --- |
| App / diary | `baby:app` | `baby:diary`, `baby:baby-diary` |
| Diaper / fralda | `baby:diaper` | `baby:fralda` |
| Pee / xixi | `baby:xixi` | `baby:pee` |
| Poo / coco | `baby:coco` | `baby:poo` |
| Both / ambos | `baby:ambos` | `baby:both` |
| Feeding / mamada | `baby:mamada` | `baby:feeding` |

## Palette

| Token | Hex |
| --- | --- |
| `baby-diary-app` | `#F8FAFC` |
| `baby-diary-diaper` | `#CBD5E1` |
| `baby-diary-xixi` | `#FACC15` |
| `baby-diary-coco` | `#92400E` |
| `baby-diary-ambos` | `#A855F7` |
| `baby-diary-mamada` | `#F9A8D4` |
| `baby-diary-mint` | `#6EE7B7` |

## Notes

Home Assistant iconsets are monochrome by design. The custom icons use the current Home Assistant icon color.

Use the SVG files in `dist/assets` when a dashboard needs the colored app artwork. After HACS installs the package, the assets can be referenced through `/hacsfiles/baby-diary-hacs/assets/` or `/local/community/baby-diary-hacs/assets/`.

