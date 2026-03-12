import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

const COLUMN_COLORS = {
  'todo':        { border: 'border-l-gray-400',   badge: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',   dot: 'bg-gray-400' },
  'in-progress': { border: 'border-l-brand-500',  badge: 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400', dot: 'bg-brand-500' },
  'done':        { border: 'border-l-emerald-500', badge: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
}

export default function Column({ column, tasks, onAddTask, onEditTask, onDeleteTask }) {
  const colors = COLUMN_COLORS[column.id] || COLUMN_COLORS['todo']

  return (
    <div className={`column-wrapper flex-1 min-w-[280px] max-w-sm border-l-4 ${colors.border}`}>
      {/* Column header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{column.title}</h2>
          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${colors.badge}`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="p-1 rounded-md text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          title={`Add task to ${column.title}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 overflow-y-auto pb-3 transition-colors duration-150 min-h-[120px] rounded-xl mx-1 mb-1
              ${snapshot.isDraggingOver ? 'drop-zone-active' : ''}
            `}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-600">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <p className="text-xs">Drop tasks here</p>
              </div>
            )}
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add task footer button */}
      <button
        onClick={onAddTask}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/60 dark:hover:bg-gray-800/40 rounded-b-2xl transition-all duration-150 group"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add task
      </button>
    </div>
  )
}
