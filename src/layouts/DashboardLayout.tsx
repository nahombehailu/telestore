import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

/**
 * DashboardLayout - Handles authenticated pages
 */
export default function DashboardLayout() {
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Refresh user data on mount
    useAuthStore.getState().refreshUser()
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Redirecting...</h1>
          <p className="text-slate-600">Please log in to continue</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar would go here */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
