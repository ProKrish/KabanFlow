import { useEffect, useRef } from 'react'

const PRIORITIES = [
  { value: 'high',   label: '🔴 High' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'low',    label: '🟢 Low' },
]

export default function TaskModal({ isOpen, onClose, onSubmit, editingTask }) {
  const titleRef = useRef(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => titleRef.current?.focus(), 50)
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const title = data.get('title').trim()
    if (!title) return
    onSubmit({
      id: editingTask?.id,
      title,
      description: data.get('description').trim() || null,
      priority: data.get('priority'),
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {editingTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleRef}
              name="title"
              type="text"
              placeholder="What needs to be done?"
              defaultValue={editingTask?.title || ''}
              required
              maxLength={120}
              className="form-input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Add more details..."
              defaultValue={editingTask?.description || ''}
              className="form-input resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Priority
            </label>
            <select
              name="priority"
              defaultValue={editingTask?.priority || 'medium'}
              className="form-input"
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
