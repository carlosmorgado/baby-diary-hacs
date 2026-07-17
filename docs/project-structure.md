# Project Structure

Baby Diary follows the normal HACS integration repository shape.

```text
baby-diary-hacs/
  brand/
    icon.png
  custom_components/
    baby_diary/
      __init__.py
      button.py
      config_flow.py
      const.py
      frontend/
        baby-diary.js
      manifest.json
      sensor.py
      services.yaml
      store.py
      translations/
        en.json
      brand/
        icon.png
  docs/
  hacs.json
  package.json
  README.md
```

## Root Files

| Path | Purpose |
| --- | --- |
| `README.md` | Main HACS/GitHub documentation |
| `hacs.json` | HACS repository metadata |
| `package.json` | Local JavaScript syntax check script |
| `LICENSE` | MIT license |
| `brand/icon.png` | HACS repository brand icon |

## Integration Runtime

Everything Home Assistant needs at runtime is under:

```text
custom_components/baby_diary/
```

This matters because HACS integration repositories must keep runtime files inside the integration folder.

| Path | Purpose |
| --- | --- |
| `manifest.json` | Home Assistant integration manifest |
| `services.yaml` | Describes `baby_diary.log_diaper_change` in the UI |
| `translations/en.json` | Config flow labels and messages |
| `frontend/baby-diary.js` | Custom card, iconset, and color registry |
| `brand/icon.png` | Brand icon for the installed Home Assistant integration |

## Python Files

See [python-files.md](python-files.md) for a detailed explanation of each Python file.

## Intentional Duplicate Brand Icons

The two `icon.png` files are intentionally identical:

- `brand/icon.png` is used by HACS.
- `custom_components/baby_diary/brand/icon.png` is used by Home Assistant.

They live in different locations because HACS and Home Assistant read brand assets from different places.

## No Root `assets/` Folder

The repository does not keep a separate root `assets/` folder.

The runtime icon paths and colors live in `frontend/baby-diary.js`, because that is the file Home Assistant loads into the browser. Keeping a second SVG/CSS copy outside the integration would create duplicated sources of truth.
