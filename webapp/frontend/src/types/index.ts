// Episode Types
export interface Episode {
  name: string
  beschreibung: string
  spotify: string
  nummer: string
  type: EpisodeType
}

export enum EpisodeType {
  DDF = 'ddf',           // Die drei ???
  DieDrei = 'diedrei',   // Die Dr3i
  Kids = 'kids',         // Die drei ??? Kids
  Sonderfolge = 'sonderfolge',
  Hoerbuch = 'hoerbuch'
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

export enum Theme {
  Bob = 'bob',
  Peter = 'peter',
  Justus = 'justus'
}

// Category Types
export enum Category {
  Range1_50 = '1-50',
  Range1_100 = '1-100',
  Range1_150 = '1-150',
  All = 'all',
  DieDrei = 'diedrei',
  Kids = 'kids',
  Hoerbuch = 'hoerbuch',
  Custom = 'custom'
}

export interface CategoryConfig {
  id: Category
  label: string
  type: EpisodeType
  range?: {
    min: number
    max: number
  }
}
