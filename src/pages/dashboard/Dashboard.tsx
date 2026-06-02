import { useAuthStore } from '@/stores/authStore'
import { useTenantStore } from '@/stores/tenantStore'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { formatDate } from '@/utils/helpers'
import { useNavigate } from '@tanstack/react-router'

/**
 * Dashboard Page - Main application page
 */
export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { currentTenant } = useTenantStore()

  const handleLogout = async () => {
    logout()
    await navigate({ to: '/auth/login' })
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, {user?.firstName}!</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-slate-600">Name</p>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Username</p>
              <p className="font-medium">{user?.username}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
            <CardDescription>Your organization details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-slate-600">Tenant</p>
              <p className="font-medium">{currentTenant?.name || 'No tenant selected'}</p>
            </div>
            {currentTenant && (
              <>
                <div>
                  <p className="text-sm text-slate-600">Slug</p>
                  <p className="font-medium text-sm">{currentTenant.slug}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Created</p>
                  <p className="font-medium text-sm">{formatDate(currentTenant.createdAt)}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Application information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-600">Roles</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user?.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-12">
            View Products
          </Button>
          <Button variant="outline" className="h-12">
            View Orders
          </Button>
          <Button variant="outline" className="h-12">
            Manage Customers
          </Button>
          <Button variant="outline" className="h-12">
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
