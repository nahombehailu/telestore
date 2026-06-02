import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Tenant, TenantSettings } from '@/types'

interface TenantStoreState {
  currentTenant: Tenant | null
  tenants: Tenant[]
  isLoading: boolean
  error: string | null
  setCurrentTenant: (tenant: Tenant | null) => void
  setTenants: (tenants: Tenant[]) => void
  updateTenantSettings: (settings: Partial<TenantSettings>) => void
  clearError: () => void
}

export const useTenantStore = create<TenantStoreState>()(
  persist(
    (set) => ({
      currentTenant: null,
      tenants: [],
      isLoading: false,
      error: null,

      setCurrentTenant: (tenant) => {
        set({ currentTenant: tenant })
      },

      setTenants: (tenants) => {
        set({ tenants })
      },

      updateTenantSettings: (settings) => {
        set((state) => ({
          currentTenant: state.currentTenant
            ? {
                ...state.currentTenant,
                settings: {
                  ...state.currentTenant.settings,
                  ...settings,
                },
              }
            : null,
        }))
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'tenant-store',
      partialize: (state) => ({
        currentTenant: state.currentTenant,
        tenants: state.tenants,
      }),
    },
  ),
)
