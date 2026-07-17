# Home Assistant package

`dist/packages/baby_diary_icons.yaml` is an optional package example for Home Assistant.

It creates helper buttons with Baby Diary icons and a template sensor that exposes the color palette as attributes.

This package file is optional. The iconset itself does not need YAML in the normal HACS Dashboard install flow, because HACS should add the frontend resource automatically.

Example `configuration.yaml` setup:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

Then copy the package file to:

```text
/config/packages/baby_diary_icons.yaml
```

If the icons do not load after installing through HACS, verify that **Settings > Dashboards > Resources** contains:

```text
/hacsfiles/baby-diary-hacs/baby-diary-hacs.js
```

As a fallback, you can load the iconset module through `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/baby-diary-hacs/baby-diary-hacs.js
```

