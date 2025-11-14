import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/api'
import type { User, LoginCredentials, RegisterData } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.login(credentials)
      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth_token', response.token)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login fehlgeschlagen'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data: RegisterData) {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.register(data)
      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth_token', response.token)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registrierung fehlgeschlagen'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      user.value = await apiService.getCurrentUser()
    } catch (err) {
      logout()
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser
  }
})
