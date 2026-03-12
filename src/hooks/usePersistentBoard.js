import { useState, useCallback } from 'react'

const STORAGE_KEY = 'kanban_board_state'

const INITIAL_STATE = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'Todo',
      taskIds: ['task-1', 'task-2'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Design new landing page',
      description: 'Create wireframes and high-fidelity mockups for the redesigned homepage.',
      priority: 'high',
      createdAt: new Date('2024-02-01').toISOString(),
      updatedAt: new Date('2024-02-01').toISOString(),
    },
    'task-2': {
      id: 'task-2',
      title: 'Set up CI/CD pipeline',
      description: 'Configure GitHub Actions for automated testing and deployment to Vercel.',
      priority: 'medium',
      createdAt: new Date('2024-02-03').toISOString(),
      updatedAt: new Date('2024-02-03').toISOString(),
    },
    'task-3': {
      id: 'task-3',
      title: 'Implement authentication',
      description: 'Add OAuth 2.0 login with Google and GitHub providers.',
      priority: 'high',
      createdAt: new Date('2024-02-05').toISOString(),
      updatedAt: new Date('2024-02-05').toISOString(),
    },
    'task-4': {
      id: 'task-4',
      title: 'Write unit tests',
      description: null,
      priority: 'low',
      createdAt: new Date('2024-01-28').toISOString(),
      updatedAt: new Date('2024-01-30').toISOString(),
    },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL_STATE
    return JSON.parse(raw)
  } catch {
    return INITIAL_STATE
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    console.error('Failed to save board state to localStorage.')
  }
}

export function usePersistentBoard() {
  const [board, setBoard] = useState(() => loadState())

  const persist = useCallback((updater) => {
    setBoard((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveState(next)
      return next
    })
  }, [])

  // Move task between/within columns (called by @hello-pangea/dnd)
  const moveTask = useCallback((result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    persist((prev) => {
      const srcCol = prev.columns[source.droppableId]
      const dstCol = prev.columns[destination.droppableId]

      if (srcCol.id === dstCol.id) {
        // Same column reorder
        const newIds = Array.from(srcCol.taskIds)
        newIds.splice(source.index, 1)
        newIds.splice(destination.index, 0, draggableId)
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [srcCol.id]: { ...srcCol, taskIds: newIds },
          },
        }
      }

      // Cross-column move
      const srcIds = Array.from(srcCol.taskIds)
      srcIds.splice(source.index, 1)
      const dstIds = Array.from(dstCol.taskIds)
      dstIds.splice(destination.index, 0, draggableId)
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [srcCol.id]: { ...srcCol, taskIds: srcIds },
          [dstCol.id]: { ...dstCol, taskIds: dstIds },
        },
      }
    })
  }, [persist])

  const addTask = useCallback(({ title, description, priority }) => {
    const id = `task-${crypto.randomUUID()}`
    const now = new Date().toISOString()
    persist((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: { id, title, description: description || null, priority, createdAt: now, updatedAt: now },
      },
      columns: {
        ...prev.columns,
        todo: {
          ...prev.columns['todo'],
          taskIds: [id, ...prev.columns['todo'].taskIds],
        },
      },
    }))
  }, [persist])

  const editTask = useCallback(({ id, title, description, priority }) => {
    const now = new Date().toISOString()
    persist((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: { ...prev.tasks[id], title, description: description || null, priority, updatedAt: now },
      },
    }))
  }, [persist])

  const deleteTask = useCallback((taskId) => {
    persist((prev) => {
      // Remove from columns
      const columns = Object.fromEntries(
        Object.entries(prev.columns).map(([colId, col]) => [
          colId,
          { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) },
        ])
      )
      // Remove from tasks
      const { [taskId]: _removed, ...tasks } = prev.tasks
      return { ...prev, columns, tasks }
    })
  }, [persist])

  const clearData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setBoard(INITIAL_STATE)
  }, [])

  return { board, moveTask, addTask, editTask, deleteTask, clearData }
}
