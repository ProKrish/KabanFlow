import { useState, useCallback } from 'react'

const STORAGE_KEY = 'kanban_notifications'

function loadNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveNotifications(notifications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications.slice(0, 50)))
  } catch { /* ignore */ }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState(() => loadNotifications())
  const [unreadCount, setUnreadCount] = useState(
    () => loadNotifications().filter((n) => !n.read).length
  )

  const push = useCallback((type, message, meta = {}) => {
    const n = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      message,
      meta,
      read: false,
      createdAt: new Date().toISOString(),
    }
    setNotifications((prev) => {
      const next = [n, ...prev].slice(0, 50)
      saveNotifications(next)
      return next
    })
    setUnreadCount((c) => c + 1)
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }))
      saveNotifications(next)
      return next
    })
    setUnreadCount(0)
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { notifications, unreadCount, push, markAllRead, clearAll }
}
