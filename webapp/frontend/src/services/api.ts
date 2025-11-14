import axios, { type AxiosInstance } from 'axios'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  Episode,
  FilteredEpisode,
  UserSettings,
  EpisodeType
} from '@/types'

class ApiService {
  private api: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add auth token to requests if available
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Handle 401 errors (unauthorized)
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data)
    return response.data
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  }

  async getCurrentUser() {
    const response = await this.api.get('/auth/me')
    return response.data
  }

  // Episode endpoints
  async getEpisodes(type: EpisodeType): Promise<Episode[]> {
    const response = await this.api.get<Episode[]>(`/episodes/${type}`)
    return response.data
  }

  async getAllEpisodes(): Promise<{
    ddf: Episode[]
    diedrei: Episode[]
    kids: Episode[]
    sonderfolgen: Episode[]
    hoerbuecher: Episode[]
  }> {
    const response = await this.api.get('/episodes/all')
    return response.data
  }

  // Filter endpoints
  async getFilteredEpisodes(): Promise<FilteredEpisode[]> {
    const response = await this.api.get<FilteredEpisode[]>('/filters')
    return response.data
  }

  async addFilteredEpisode(episode: Omit<FilteredEpisode, 'id' | 'userId'>): Promise<FilteredEpisode> {
    const response = await this.api.post<FilteredEpisode>('/filters', episode)
    return response.data
  }

  async removeFilteredEpisode(episodeId: string): Promise<void> {
    await this.api.delete(`/filters/${episodeId}`)
  }

  // Settings endpoints
  async getSettings(): Promise<UserSettings> {
    const response = await this.api.get<UserSettings>('/settings')
    return response.data
  }

  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const response = await this.api.put<UserSettings>('/settings', settings)
    return response.data
  }
}

export const apiService = new ApiService()
