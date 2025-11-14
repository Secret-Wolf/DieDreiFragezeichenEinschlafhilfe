import { Request } from 'express'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    username: string
  }
}

export interface Episode {
  name: string
  beschreibung: string
  spotify: string
  nummer: string
  type: string
}

export interface EpisodeResponse {
  folgen: Episode[]
}

export enum EpisodeType {
  DDF = 'ddf',
  DieDrei = 'diedrei',
  Kids = 'kids',
  Sonderfolge = 'sonderfolge',
  Hoerbuch = 'hoerbuch'
}

export interface UserSettings {
  theme: string
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
