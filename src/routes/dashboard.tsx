import { Route } from '@tanstack/react-router'
import { dashboardLayoutRoute } from './dashboard.layout'
import Dashboard from '@/pages/dashboard/Dashboard'

export const dashboardRoute = new Route({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  component: Dashboard,
})
