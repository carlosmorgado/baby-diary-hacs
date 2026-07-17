# Home Assistant package

`dist/packages/baby_diary_icons.yaml` is an optional package example for Home Assistant.

It creates helper buttons with Baby Diary icons and a template sensor that exposes the color palette as attributes.

Example `configuration.yaml` setup:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

Then copy the package file to:

```text
/config/packages/baby_diary_icons.yaml
```

The iconset itself still needs to be loaded through the frontend:

```yaml
frontend:
  extra_module_url:
    - /local/community/baby-diary-hacs/baby-diary-hacs.js
```

