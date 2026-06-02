import { useLink, useNavigate } from '@tanstack/react-router'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { useAuthStore } from '@/stores/authStore'

/**
 * Index Page - Landing/Home page
 */
export default function Index() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      await navigate({ to: '/dashboard' })
    } else {
      await navigate({ to: '/auth/login' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900">
              TeleStore
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Production-ready multi-tenant telecommunications management platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multi-Tenant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Serve multiple organizations with isolated data and configurations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Type-Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Built with TypeScript and TanStack Router for reliability
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Production-Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Optimized performance with React Query and modern tooling
                </p>
              </CardContent>
            </Card>
          </div>

          <Button size="lg" onClick={handleGetStarted}>
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </div>
      </div>
    </div>
  )
}
