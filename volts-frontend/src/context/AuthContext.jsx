import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = async () => {
    try {
      const { data } = await api.get('/auth/me/')
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('volts_access')) {
      fetchMe()
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login/', { username, password })
    localStorage.setItem('volts_access', data.tokens.access)
    localStorage.setItem('volts_refresh', data.tokens.refresh)
    setUser(data.user)
    return data.user
  }

  const register = async (username, email, password) => {
    const { data } = await api.post('/auth/register/', { username, email, password })
    localStorage.setItem('volts_access', data.tokens.access)
    localStorage.setItem('volts_refresh', data.tokens.refresh)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('volts_access')
    localStorage.removeItem('volts_refresh')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, refreshMe: fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
