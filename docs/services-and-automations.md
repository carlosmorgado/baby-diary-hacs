# Services And Automations

Baby Diary exposes one action:

```yaml
action: baby_diary.log_diaper_change
data:
  baby_name: Goncalo
  type: xixi
```

## Fields

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `type` | Yes | `xixi`, `coco`, `ambos` | Diaper type to log |
| `baby_name` | No | Baby name or slug | Needed when more than one Baby Diary entry exists |
| `entry_id` | No | Config entry ID | Advanced target when baby name is not enough |

Use `baby_name` for dashboards and automations. Use `entry_id` only if you are deliberately targeting a specific config entry.

## Diaper Counting Rules

| Type | Diapers | Xixi | Coco |
| --- | ---: | ---: | ---: |
| `xixi` | +1 | +1 | +0 |
| `coco` | +1 | +0 | +1 |
| `ambos` | +1 | +1 | +1 |

`ambos` means one diaper contained both xixi and coco.

## Automation Example

```yaml
alias: Log diaper from helper
triggers:
  - trigger: state
    entity_id: input_button.log_goncalo_xixi
actions:
  - action: baby_diary.log_diaper_change
    data:
      baby_name: Goncalo
      type: xixi
```

## NFC Tag Example

```yaml
alias: NFC diaper xixi
triggers:
  - trigger: tag
    tag_id: 00000000-0000-0000-0000-000000000000
actions:
  - action: baby_diary.log_diaper_change
    data:
      baby_name: Goncalo
      type: xixi
```

## Button Entity Example

The integration also creates Home Assistant button entities. You can press them directly:

```yaml
action: button.press
target:
  entity_id: button.log_xixi_goncalo
```

## Lovelace Button Example

```yaml
type: button
name: Xixi
icon: baby:xixi
tap_action:
  action: perform-action
  perform_action: baby_diary.log_diaper_change
  data:
    baby_name: Goncalo
    type: xixi
```

## Multiple Babies

When there is more than one Baby Diary entry, calls without `baby_name` or `entry_id` will fail on purpose. This avoids accidentally logging a diaper to the wrong baby.
