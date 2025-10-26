// API客户端工具类

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface RequestOptions extends RequestInit {
  data?: any
}

class APIClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // 添加认证token
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { data, ...restOptions } = options

    const config: RequestInit = {
      ...restOptions,
      headers: this.getHeaders(),
    }

    if (data) {
      config.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || 'Request failed')
    }

    return response.json()
  }

  // GET请求
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // POST请求
  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', data })
  }

  // PUT请求
  put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', data })
  }

  // PATCH请求
  patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', data })
  }

  // DELETE请求
  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new APIClient()

// 产品API
export const productAPI = {
  getAll: () => apiClient.get('/api/admin/products'),
  create: (data: any) => apiClient.post('/api/admin/products', data),
  update: (id: string, data: any) => apiClient.put('/api/admin/products', { id, ...data }),
  delete: (id: string) => apiClient.delete(`/api/admin/products?id=${id}`),
}

// 内容API
export const contentAPI = {
  get: (section: string) => apiClient.get(`/api/admin/content?section=${section}`),
  save: (section: string, data: any) => apiClient.post('/api/admin/content', { section, data }),
}

// 询价API
export const inquiryAPI = {
  getAll: (params?: { status?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString()
    return apiClient.get(`/api/admin/inquiries${query ? `?${query}` : ''}`)
  },
  create: (data: any) => apiClient.post('/api/admin/inquiries', data),
  updateStatus: (id: number, status: string) => 
    apiClient.patch('/api/admin/inquiries', { id, status }),
  delete: (id: number) => apiClient.delete(`/api/admin/inquiries?id=${id}`),
}

// 认证API
export const authAPI = {
  login: (username: string, password: string) =>
    apiClient.post('/api/admin/auth/login', { username, password }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
  },
}

