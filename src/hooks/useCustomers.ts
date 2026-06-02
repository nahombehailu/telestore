import { useQuery, useMutation } from '@tanstack/react-query'
import { apiClient } from '@/services/apiClient'
import { Customer, PaginatedResponse } from '@/types'

/**
 * Fetch customers with pagination
 */
export function useCustomers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['customers', page, limit],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Customer>>('/customers', {
        params: { page, limit },
      })
      return response.data.data!
    },
  })
}

/**
 * Fetch single customer by ID
 */
export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await apiClient.get<Customer>(`/customers/${id}`)
      return response.data.data!
    },
    enabled: !!id,
  })
}

/**
 * Create new customer
 */
export function useCreateCustomer() {
  return useMutation({
    mutationFn: async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post<Customer>('/customers', data)
      return response.data.data!
    },
  })
}

/**
 * Update customer
 */
export function useUpdateCustomer(id: string) {
  return useMutation({
    mutationFn: async (data: Partial<Customer>) => {
      const response = await apiClient.put<Customer>(`/customers/${id}`, data)
      return response.data.data!
    },
  })
}

/**
 * Delete customer
 */
export function useDeleteCustomer(id: string) {
  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/customers/${id}`)
    },
  })
}
