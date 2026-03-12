import { Draggable } from '@hello-pangea/dnd'

const PRIORITY_STYLES = {
  high:   { badge: 'badge-high',   dot: 'bg-red-500',    label: 'High' },
  medium: { badge: 'badge-medium', dot: 'bg-amber-500',  label: 'Medium' },
  low:    { badge: 'badge-low',    dot: 'bg-emerald-500', label: 'Low' },
}

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function TaskCard({ task, index, onEdit, onDelete }) {
  const { badge, dot, label } = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            task-card p-4 mx-3 mb-2 animate-fade-in
            ${snapshot.isDragging ? 'shadow-xl ring-2 ring-brand-400 dark:ring-brand-500 rotate-1 scale-[1.02]' : ''}
          `}
          style={provided.draggableProps.style}
        >
          {/* Priority badge */}
          <div className="flex items-center justify-between mb-2.5">
            <span className={badge}>
              <span className={`w-1.5 h-1.5 rounded-full ${dot} inline-block`} />
              {label}
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
              {/* always show for now */}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-1.5 line-clamp-2">
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(task.updatedAt)}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task) }}
                className="p-1.5 rounded-md text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
                title="Edit task"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
                className="p-1.5 rounded-md text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Delete task"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
