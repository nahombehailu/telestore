import { Outlet } from '@tanstack/react-router'

/**
 * AuthLayout - Handles authentication pages
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Outlet />
      </div>
    </div>
  )
}
