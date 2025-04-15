// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref(null)

  const login = async (username, password) => {
    try {
      loading.value = true
      error.value = null
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (username && password) {
        const mockToken = 'mock-jwt-token'
        localStorage.setItem('token', mockToken)
        token.value = mockToken
        user.value = {
          id: 1,
          username,
          role: 'inspector'
        }
        return true
      }
      
      throw new Error('Invalid credentials')
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    token.value = null
    user.value = null
    window.location.href = '/login'
  }

  const checkAuth = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // Mock user data
      user.value = {
        id: 1,
        username: 'inspector',
        role: 'inspector'
      }
      return true
    }
    return false
  }

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    checkAuth
  }
})