# Services And Automations

Baby Diary exposes actions for diapers and feedings.

## Log Diaper Change

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

## Toggle Feeding

Use `baby_diary.toggle_feeding` to start or stop a feeding session:

```yaml
action: baby_diary.toggle_feeding
data:
  baby_name: Goncalo
```

If no feeding is active for that baby, the action starts one. If a feeding is already active, the action stops it and records the duration.

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `baby_name` | No | Baby name or slug | Needed when more than one Baby Diary entry exists |
| `entry_id` | No | Config entry ID | Advanced target when baby name is not enough |

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

```yaml
action: button.press
target:
  entity_id: button.toggle_mamada_goncalo
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

```yaml
type: button
name: Mamada
icon: baby:mamada
tap_action:
  action: perform-action
  perform_action: baby_diary.toggle_feeding
  data:
    baby_name: Goncalo
```

## Multiple Babies

When there is more than one Baby Diary entry, calls without `baby_name` or `entry_id` will fail on purpose. This avoids accidentally logging a diaper to the wrong baby.
