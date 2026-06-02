import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useTimezone, getTimezoneOffset, getPopularTimezones, getAllTimezones, TimeZoneInfo } from '@/hooks/useTimezone'
import { cn } from '@/utils/cn'
import { ChevronDown, Globe } from 'lucide-react'

/**
 * Digital Clock component for a single timezone
 */
function TimezoneClockCard({ timezone }: { timezone: TimeZoneInfo }) {
  const { formattedTime, formattedDate } = useTimezone(timezone.id)
  const offset = getTimezoneOffset(timezone.id)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{timezone.name}</CardTitle>
            <CardDescription className="text-xs mt-1">{timezone.label}</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            {offset}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {formattedTime}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {formattedDate}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Digital Clock - Main component displaying multiple timezones
 */
export default function DigitalClock() {
  const [showAll, setShowAll] = useState(false)
  const popularTimezones = getPopularTimezones()
  const allTimezones = getAllTimezones()
  const displayedTimezones = showAll ? allTimezones : popularTimezones

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
              World Clock
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time digital clock displaying current time across multiple time zones around the globe
          </p>
        </div>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTimezones.map((timezone) => (
            <TimezoneClockCard key={timezone.id} timezone={timezone} />
          ))}
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
              showAll
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-50 hover:bg-slate-300 dark:hover:bg-slate-600',
            )}
          >
            <span>{showAll ? 'Show Popular' : `Show All (${allTimezones.length})`}</span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', showAll && 'rotate-180')} />
          </button>
        </div>

        {/* Info Section */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-50">About This Clock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-900 dark:text-blue-100">
            <p>
              This digital clock displays the current time in {allTimezones.length} different time zones across the world. 
              The time updates every second to show real-time information.
            </p>
            <p>
              Each clock shows:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Current time in HH:MM:SS format</li>
                <li>Day and date in the local timezone</li>
                <li>Timezone offset from UTC</li>
              </ul>
            </p>
            <p>
              Click the button above to toggle between popular timezones and all available timezones.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
