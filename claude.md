# Project Constitution (claude.md)

## Discovery Answers — LOCKED ✅

| # | Question | Answer |
|---|---|---|
| 1 | **North Star** | Single-page Kanban board: create, drag, edit, delete tasks across Todo → In Progress → Done with localStorage persistence |
| 2 | **Integrations** | No external APIs. Stack: React, Tailwind CSS, @hello-pangea/dnd, localStorage. Deploy: Vercel |
| 3 | **Source of Truth** | `localStorage` key: `kanban_board_state`. All reads/writes via `usePersistentBoard()` hook only |
| 4 | **Delivery Payload** | Fully interactive React SPA on Vercel |
| 5 | **Behavioral Rules** | See rules section below |

---

## Kanban Data Schema

### localStorage Key: `kanban_board_state`

```json
{
  "columns": {
    "todo": {
      "id": "todo",
      "title": "Todo",
      "taskIds": ["task-1"]
    },
    "in-progress": {
      "id": "in-progress",
      "title": "In Progress",
      "taskIds": []
    },
    "done": {
      "id": "done",
      "title": "Done",
      "taskIds": []
    }
  },
  "tasks": {
    "task-1": {
      "id": "task-1",
      "title": "string",
      "description": "string | null",
      "priority": "low | medium | high",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  },
  "columnOrder": ["todo", "in-progress", "done"]
}
```

### Priority Enum
| Value | Display | Color |
|---|---|---|
| `high` | High | Red |
| `medium` | Medium | Yellow/Orange |
| `low` | Low | Green |

---

## Behavioral Rules — LOCKED ✅

1. New tasks always land in the **`todo`** column.
2. A task **CANNOT** exist in two columns simultaneously.
3. Deleting a task removes it from both `tasks{}` and its column's `taskIds[]`.
4. Column order is **fixed** (no column reordering in v1) — always `["todo", "in-progress", "done"]`.
5. `localStorage` is the **only** persistence layer — no backend, no cookies.
6. **DO NOT** use any drag-and-drop library that requires a paid license. Use `@hello-pangea/dnd` (MIT).
7. UI must be **responsive**: stacked single-column on mobile, 3-column grid on desktop.

---

## Architectural Invariants

1. **Single Hook Rule**: No component touches `localStorage` directly. Only `usePersistentBoard()` hook reads/writes.
2. **Immutable Schema**: Any schema change requires updating this file before any code change.
3. **Atomic State**: Any mutation saves the full state object to `localStorage` immediately.
4. **Deterministic IDs**: Task IDs use `crypto.randomUUID()`.
5. **No External Calls**: No `fetch()`, no API calls. 100% offline-capable.

---

## Maintenance Log
- *2026-03-12* — Schema defined and locked. Discovery questions answered. Blueprint approved.
