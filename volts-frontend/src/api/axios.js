import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({ baseURL: API_BASE_URL })

api.interceptors.request.use((config) => {
  const access = localStorage.getItem('volts_access')
  if (access) config.headers.Authorization = `Bearer ${access}`
  return config
})

// Auto-refresh access token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('volts_refresh')
      if (refresh) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh })
          localStorage.setItem('volts_access', data.access)
          original.headers.Authorization = `Bearer ${data.access}`
          return api(original)
        } catch (e) {
          localStorage.removeItem('volts_access')
          localStorage.removeItem('volts_refresh')
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
