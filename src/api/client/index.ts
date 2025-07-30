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
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return (await response.json()) as T
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

    const response = await fetch(url, config)

    return this.handleResponse<T>(response)
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
