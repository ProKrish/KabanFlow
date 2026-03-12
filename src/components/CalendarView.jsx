import { useState } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarView({ board }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  // Collect tasks by day
  const tasksByDay = {}
  Object.values(board.tasks).forEach((task) => {
    if (!task.createdAt) return
    const d = new Date(task.createdAt)
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      const day = d.getDate()
      if (!tasksByDay[day]) tasksByDay[day] = []
      tasksByDay[day].push(task)
    }
  })

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const calendarCells = []
  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()

  const priorityDot = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-emerald-500',
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            View your tasks on the calendar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="btn-ghost p-2" aria-label="Previous month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => { setCurrentMonth(today.getMonth()); setCurrentYear(today.getFullYear()) }}
            className="btn-ghost px-3 py-1.5 text-sm"
          >
            Today
          </button>
          <button onClick={nextMonth} className="btn-ghost p-2" aria-label="Next month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-card">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {DAYS.map((d) => (
            <div key={d} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7">
          {calendarCells.map((day, i) => (
            <div
              key={i}
              className={`
                min-h-[100px] p-2 border-b border-r border-gray-100 dark:border-gray-800 transition-colors
                ${day ? 'hover:bg-gray-50 dark:hover:bg-gray-800/40' : 'bg-gray-50/50 dark:bg-gray-900/50'}
              `}
            >
              {day && (
                <>
                  <span
                    className={`
                      inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium mb-1
                      ${isToday(day)
                        ? 'bg-brand-600 text-white'
                        : 'text-gray-700 dark:text-gray-300'}
                    `}
                  >
                    {day}
                  </span>
                  {tasksByDay[day] && (
                    <div className="space-y-1">
                      {tasksByDay[day].slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs truncate"
                          title={task.title}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityDot[task.priority] || priorityDot.low}`} />
                          <span className="truncate text-gray-700 dark:text-gray-300">{task.title}</span>
                        </div>
                      ))}
                      {tasksByDay[day].length > 3 && (
                        <p className="text-[10px] text-gray-400 pl-1">+{tasksByDay[day].length - 3} more</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
