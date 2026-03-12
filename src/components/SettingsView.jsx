import { useState } from 'react'

export default function SettingsView({ darkMode, setDarkMode, onClearData }) {
  const [showConfirm, setShowConfirm] = useState(false)

  function handleClear() {
    onClearData()
    setShowConfirm(false)
  }

  return (
    <div className="flex-1 overflow-auto p-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your preferences</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Appearance</h3>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Toggle between light and dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                  ${darkMode ? 'bg-brand-600' : 'bg-gray-300 dark:bg-gray-600'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200
                    ${darkMode ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">About</h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">App</span>
              <span className="font-medium text-gray-900 dark:text-white">KanbanFlow</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Version</span>
              <span className="font-medium text-gray-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Storage</span>
              <span className="font-medium text-gray-900 dark:text-white">localStorage</span>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100 dark:border-red-900/30">
            <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Clear All Data</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Remove all tasks and reset to default</p>
              </div>
              {!showConfirm ? (
                <button onClick={() => setShowConfirm(true)} className="btn-danger">
                  Clear Data
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowConfirm(false)} className="btn-ghost text-xs py-1.5">
                    Cancel
                  </button>
                  <button
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
