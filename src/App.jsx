import { useState, useEffect, useCallback } from 'react'
import { usePersistentBoard } from './hooks/usePersistentBoard'
import { useNotifications } from './hooks/useNotifications'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Board from './components/Board'
import TaskModal from './components/TaskModal'
import CalendarView from './components/CalendarView'
import AnalyticsView from './components/AnalyticsView'
import SettingsView from './components/SettingsView'

const COLUMN_LABELS = {
  'todo': 'Todo',
  'in-progress': 'In Progress',
  'done': 'Done',
}

export default function App() {
  const { board, moveTask, addTask, editTask, deleteTask, clearData } = usePersistentBoard()
  const { notifications, unreadCount, push, markAllRead, clearAll } = useNotifications()

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('kanban_theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState({ open: false, task: null })
  const [activePage, setActivePage] = useState('board')

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('kanban_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function openAddModal() {
    setModal({ open: true, task: null })
  }

  function openEditModal(task) {
    setModal({ open: true, task })
  }

  function closeModal() {
    setModal({ open: false, task: null })
  }

  // Wrapped task actions that also push notifications
  const handleMoveTask = useCallback((result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const taskTitle = board.tasks[draggableId]?.title || 'A task'
    const fromLabel = COLUMN_LABELS[source.droppableId] || source.droppableId
    const toLabel = COLUMN_LABELS[destination.droppableId] || destination.droppableId

    moveTask(result)

    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === 'done') {
        push('moved', `✅ "${taskTitle}" marked as Done!`)
      } else {
        push('moved', `"${taskTitle}" moved from ${fromLabel} → ${toLabel}`)
      }
    }
  }, [board.tasks, moveTask, push])

  function handleSubmit({ id, title, description, priority }) {
    if (id) {
      editTask({ id, title, description, priority })
      push('edited', `"${title}" was updated`)
    } else {
      addTask({ title, description, priority })
      push('added', `"${title}" added to Todo`)
    }
  }

  const handleDelete = useCallback((taskId) => {
    const taskTitle = board.tasks[taskId]?.title || 'A task'
    deleteTask(taskId)
    push('deleted', `"${taskTitle}" was removed`)
  }, [board.tasks, deleteTask, push])

  const totalTasks = Object.keys(board.tasks).length

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setSidebarOpen={setSidebarOpen}
          totalTasks={totalTasks}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onClearNotifications={clearAll}
        />

        {/* Page content */}
        {activePage === 'board' && (
          <>
            {/* Board title bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Board View</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {totalTasks} task{totalTasks !== 1 ? 's' : ''} across {board.columnOrder.length} columns
                </p>
              </div>
              <button onClick={openAddModal} className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Task
              </button>
            </div>

            {/* Board */}
            <div className="flex-1 overflow-hidden py-4">
              <Board
                board={board}
                search={search}
                moveTask={handleMoveTask}
                onAddTask={openAddModal}
                onEditTask={openEditModal}
                onDeleteTask={handleDelete}
              />
            </div>
          </>
        )}

        {activePage === 'calendar' && (
          <CalendarView board={board} />
        )}

        {activePage === 'analytics' && (
          <AnalyticsView board={board} />
        )}

        {activePage === 'settings' && (
          <SettingsView
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onClearData={clearData}
          />
        )}
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={modal.open}
        editingTask={modal.task}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
