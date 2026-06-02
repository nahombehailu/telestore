import { useEffect, useState } from 'react'

export interface TimeZoneInfo {
  id: string
  name: string
  label: string
}

export interface TimeZoneData {
  timezone: TimeZoneInfo
  time: Date
  formattedTime: string
  formattedDate: string
  offset: string
}

/**
 * Hook to get current time in a specific timezone
 */
export function useTimezone(timezoneId: string, updateInterval = 1000) {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval])

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return {
    time,
    formattedTime: formatter.format(time),
    formattedDate: dateFormatter.format(time),
  }
}

/**
 * Hook to get timezone offset
 */
export function getTimezoneOffset(timezoneId: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    timeZoneName: 'shortOffset',
  })

  const parts = formatter.formatToParts(new Date())
  const offsetPart = parts.find((part) => part.type === 'timeZoneName')

  return offsetPart ? offsetPart.value : 'UTC'
}

/**
 * Get all available timezones
 */
export function getAllTimezones(): TimeZoneInfo[] {
  return [
    // UTC
    { id: 'UTC', name: 'UTC', label: 'Coordinated Universal Time' },

    // Americas
    { id: 'America/New_York', name: 'EST', label: 'Eastern Standard Time' },
    { id: 'America/Chicago', name: 'CST', label: 'Central Standard Time' },
    { id: 'America/Denver', name: 'MST', label: 'Mountain Standard Time' },
    { id: 'America/Los_Angeles', name: 'PST', label: 'Pacific Standard Time' },
    { id: 'America/Anchorage', name: 'AKST', label: 'Alaska Standard Time' },
    { id: 'Pacific/Honolulu', name: 'HST', label: 'Hawaii Standard Time' },
    { id: 'America/Toronto', name: 'EST', label: 'Eastern Time (Canada)' },
    { id: 'America/Mexico_City', name: 'CST', label: 'Mexico City' },
    { id: 'America/Buenos_Aires', name: 'ART', label: 'Argentina Time' },
    { id: 'America/Sao_Paulo', name: 'BRT', label: 'Brasília Time' },

    // Europe
    { id: 'Europe/London', name: 'GMT', label: 'Greenwich Mean Time' },
    { id: 'Europe/Paris', name: 'CET', label: 'Central European Time' },
    { id: 'Europe/Berlin', name: 'CET', label: 'Central European Time' },
    { id: 'Europe/Madrid', name: 'CET', label: 'Central European Time' },
    { id: 'Europe/Rome', name: 'CET', label: 'Central European Time' },
    { id: 'Europe/Athens', name: 'EET', label: 'Eastern European Time' },
    { id: 'Europe/Moscow', name: 'MSK', label: 'Moscow Standard Time' },
    { id: 'Europe/Istanbul', name: 'EET', label: 'Eastern European Time' },

    // Africa
    { id: 'Africa/Cairo', name: 'EET', label: 'Eastern European Time' },
    { id: 'Africa/Johannesburg', name: 'SAST', label: 'South Africa Standard Time' },
    { id: 'Africa/Lagos', name: 'WAT', label: 'West Africa Time' },
    { id: 'Africa/Nairobi', name: 'EAT', label: 'East Africa Time' },

    // Asia
    { id: 'Asia/Dubai', name: 'GST', label: 'Gulf Standard Time' },
    { id: 'Asia/Kolkata', name: 'IST', label: 'India Standard Time' },
    { id: 'Asia/Bangkok', name: 'ICT', label: 'Indochina Time' },
    { id: 'Asia/Hong_Kong', name: 'HKT', label: 'Hong Kong Time' },
    { id: 'Asia/Shanghai', name: 'CST', label: 'China Standard Time' },
    { id: 'Asia/Tokyo', name: 'JST', label: 'Japan Standard Time' },
    { id: 'Asia/Seoul', name: 'KST', label: 'Korea Standard Time' },
    { id: 'Asia/Singapore', name: 'SGT', label: 'Singapore Time' },

    // Oceania
    { id: 'Australia/Sydney', name: 'AEDT', label: 'Australian Eastern Daylight Time' },
    { id: 'Australia/Melbourne', name: 'AEDT', label: 'Australian Eastern Daylight Time' },
    { id: 'Australia/Brisbane', name: 'AEST', label: 'Australian Eastern Standard Time' },
    { id: 'Australia/Perth', name: 'AWST', label: 'Australian Western Standard Time' },
    { id: 'Pacific/Auckland', name: 'NZDT', label: 'New Zealand Daylight Time' },
    { id: 'Pacific/Fiji', name: 'FJT', label: 'Fiji Time' },
  ]
}

/**
 * Get popular timezones
 */
export function getPopularTimezones(): TimeZoneInfo[] {
  const popular = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Hong_Kong',
    'Australia/Sydney',
  ]

  const allTimezones = getAllTimezones()
  return allTimezones.filter((tz) => popular.includes(tz.id))
}
