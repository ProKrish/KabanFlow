export default function AnalyticsView({ board }) {
  const allTasks = Object.values(board.tasks)
  const total = allTasks.length

  const todoCount = board.columns['todo']?.taskIds.length || 0
  const inProgressCount = board.columns['in-progress']?.taskIds.length || 0
  const doneCount = board.columns['done']?.taskIds.length || 0

  const highCount = allTasks.filter((t) => t.priority === 'high').length
  const mediumCount = allTasks.filter((t) => t.priority === 'medium').length
  const lowCount = allTasks.filter((t) => t.priority === 'low').length

  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0

  const statCards = [
    { label: 'Total Tasks', value: total, icon: '📋', color: 'from-brand-500 to-brand-700' },
    { label: 'Completed', value: doneCount, icon: '✅', color: 'from-emerald-500 to-emerald-700' },
    { label: 'In Progress', value: inProgressCount, icon: '⏳', color: 'from-amber-500 to-amber-700' },
    { label: 'Completion Rate', value: `${completionRate}%`, icon: '📈', color: 'from-violet-500 to-violet-700' },
  ]

  const columnBars = [
    { label: 'Todo', count: todoCount, color: 'bg-gray-400', max: total },
    { label: 'In Progress', count: inProgressCount, color: 'bg-brand-500', max: total },
    { label: 'Done', count: doneCount, color: 'bg-emerald-500', max: total },
  ]

  const priorityBars = [
    { label: 'High', count: highCount, color: 'bg-red-500', max: total },
    { label: 'Medium', count: mediumCount, color: 'bg-amber-500', max: total },
    { label: 'Low', count: lowCount, color: 'bg-emerald-500', max: total },
  ]

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Overview of your task board</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow-card"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${card.color} opacity-10 -translate-y-4 translate-x-4`} />
            <p className="text-2xl mb-1">{card.icon}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Column */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-card">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tasks by Column</h3>
          <div className="space-y-4">
            {columnBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 dark:text-gray-400">{bar.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{bar.count}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bar.color} rounded-full transition-all duration-500`}
                    style={{ width: bar.max > 0 ? `${(bar.count / bar.max) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Priority */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-card">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tasks by Priority</h3>
          <div className="space-y-4">
            {priorityBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 dark:text-gray-400">{bar.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{bar.count}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bar.color} rounded-full transition-all duration-500`}
                    style={{ width: bar.max > 0 ? `${(bar.count / bar.max) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
