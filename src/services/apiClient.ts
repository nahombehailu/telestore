import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import { ApiError, ApiResponse } from '@/types'
import { useAuthStore } from '@/stores/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8088/api'

class ApiClient {
  private instance: AxiosInstance
  private refreshPromise: Promise<string> | null = null

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().token?.accessToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          if (!this.refreshPromise) {
            this.refreshPromise = this.refreshAccessToken().finally(
              () => (this.refreshPromise = null),
            )
          }

          try {
            const newToken = await this.refreshPromise
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`
            }
            return this.instance(originalRequest)
          } catch (refreshError) {
            useAuthStore.getState().logout()
            return Promise.reject(refreshError)
          }
        }

        return this.handleError(error)
      },
    )
  }

  private async refreshAccessToken(): Promise<string> {
    const authStore = useAuthStore.getState()
    const refreshToken = authStore.token?.refreshToken

    if (!refreshToken) {
      throw new ApiError(401, 'NO_REFRESH_TOKEN', 'No refresh token available')
    }

    const response = await this.instance.post<ApiResponse<{ accessToken: string }>>(
      '/auth/refresh',
      { refreshToken },
    )

    const newToken = response.data.data?.accessToken
    if (!newToken) {
      throw new ApiError(401, 'REFRESH_FAILED', 'Failed to refresh token')
    }

    authStore.setToken({
      ...authStore.token!,
      accessToken: newToken,
    })

    return newToken
  }

  private handleError(error: AxiosError) {
    const statusCode = error.response?.status || 500
    const errorData = error.response?.data as Record<string, string> | undefined

    const apiError = new ApiError(
      statusCode,
      errorData?.code || 'UNKNOWN_ERROR',
      errorData?.message || error.message || 'An unknown error occurred',
    )

    return Promise.reject(apiError)
  }

  get<T = unknown>(url: string, config?: Parameters<AxiosInstance['get']>[1]) {
    return this.instance.get<ApiResponse<T>>(url, config)
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: Parameters<AxiosInstance['post']>[2],
  ) {
    return this.instance.post<ApiResponse<T>>(url, data, config)
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: Parameters<AxiosInstance['put']>[2],
  ) {
    return this.instance.put<ApiResponse<T>>(url, data, config)
  }

  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: Parameters<AxiosInstance['patch']>[2],
  ) {
    return this.instance.patch<ApiResponse<T>>(url, data, config)
  }

  delete<T = unknown>(url: string, config?: Parameters<AxiosInstance['delete']>[1]) {
    return this.instance.delete<ApiResponse<T>>(url, config)
  }
}

export const apiClient = new ApiClient()
