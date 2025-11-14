// Episode Types
export type EpisodeType = 'ddf' | 'diedrei' | 'kids' | 'sonderfolge' | 'hoerbuch'

export interface Episode {
  name: string
  beschreibung: string
  spotify: string
  nummer: string
  type: EpisodeType
}

export interface EpisodeResponse {
  folgen: Episode[]
}

// User Types
export interface User {
  id: string
  username: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  username: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Filter Types
export interface FilteredEpisode {
  id?: string
  userId: string
  episodeNummer: string
  episodeType: EpisodeType
}

// Settings Types
export type Theme = 'bob' | 'peter' | 'justus'

export interface UserSettings {
  theme: Theme
  onlineMode: boolean
  customRangeDDF: {
    min: number
    max: number
  }
  customRangeDieDrei: {
    min: number
    max: number
  }
  customRangeKids: {
    min: number
    max: number
  }
}

// Category Types
export type Category = '1-50' | '1-100' | '1-150' | 'all' | 'diedrei' | 'kids' | 'hoerbuch' | 'custom'

export interface CategoryConfig {
  id: Category
  label: string
  type: EpisodeType
  range?: {
    min: number
    max: number
  }
}
