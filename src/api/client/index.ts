import { ApiError, NetworkError } from '@/api/types/errors'
import { ERROR_MESSAGES } from '@/config'

class ApiClient {
  private static instance: ApiClient

  private constructor() {}

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const message = ERROR_MESSAGES.HTTP_ERROR(response.status)
      throw new ApiError(response.status, message, response)
    }

    try {
      return (await response.json()) as T
    } catch (error) {
      throw new ApiError(
        response.status,
        'Failed to parse response as JSON',
        response
      )
    }
  }

  private async fetchWithConfig<T>(
    url: string,
    method: string,
    body?: any
  ): Promise<T> {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    }

    try {
      const response = await fetch(url, config)
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      // Network or other fetch errors
      throw new NetworkError(
        'Network request failed',
        error instanceof Error ? error : undefined
      )
    }
  }

  public get<T>(url: string): Promise<T> {
    return this.fetchWithConfig<T>(url, 'GET')
  }

  public post<T>(url: string, body: any): Promise<T> {
    return this.fetchWithConfig<T>(url, 'POST', body)
  }

  public put<T>(url: string, body: any): Promise<T> {
    return this.fetchWithConfig<T>(url, 'PUT', body)
  }

  public delete<T>(url: string): Promise<T> {
    return this.fetchWithConfig<T>(url, 'DELETE')
  }
}

export const api = ApiClient.getInstance()
