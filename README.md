# Baby Diary HACS

Baby Diary HACS provides the Home Assistant iconset and color palette used by the Baby Diary app for baby care tracking.

It includes icons for:

- App / diary
- Diaper / fralda
- Pee / xixi
- Poo / coco
- Both / ambos
- Feeding / mamada

Control icons such as edit, delete, plus, theme, and navigation are intentionally not included.

## HACS install

1. In HACS, add this repository as a custom repository.
2. Choose the **Dashboard** category.
3. Install **Baby Diary HACS**.
4. Restart Home Assistant or reload frontend resources.

Add the iconset module to `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/community/baby-diary-hacs/baby-diary-hacs.js
```

Some HACS installations expose frontend resources through `/hacsfiles` instead:

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/baby-diary-hacs/baby-diary-hacs.js
```

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

Colored SVG assets are bundled under `dist/assets`. After HACS installs the package, these can be referenced from dashboards with paths such as:

```text
/local/community/baby-diary-hacs/assets/xixi.svg
```

## Home Assistant package example

An example package is included at `dist/packages/baby_diary_icons.yaml`. Copy or include it from your Home Assistant configuration if you want helper entities that expose the icon names and palette.

