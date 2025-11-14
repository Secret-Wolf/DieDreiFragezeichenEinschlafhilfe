import axios from 'axios'
import { Episode, EpisodeResponse, EpisodeType } from '../types'

const API_BASE_URL = 'https://api.citroncode.com/android/ddf/v5'

export class EpisodeService {
  private async fetchEpisodes(endpoint: string): Promise<Episode[]> {
    try {
      const response = await axios.get<EpisodeResponse>(`${API_BASE_URL}/${endpoint}`)
      return response.data.folgen || []
    } catch (error) {
      console.error(`Error fetching episodes from ${endpoint}:`, error)
      return []
    }
  }

  async getEpisodesByType(type: EpisodeType): Promise<Episode[]> {
    const endpoints: Record<EpisodeType, string> = {
      [EpisodeType.DDF]: 'folgen.json',
      [EpisodeType.DieDrei]: 'folgen_diedrei.json',
      [EpisodeType.Kids]: 'folgen_kids.json',
      [EpisodeType.Sonderfolge]: 'sonderfolgen_ddf.json',
      [EpisodeType.Hoerbuch]: 'hoerbuecher.json'
    }

    const endpoint = endpoints[type]
    if (!endpoint) {
      throw new Error(`Unknown episode type: ${type}`)
    }

    return this.fetchEpisodes(endpoint)
  }

  async getAllEpisodes(): Promise<{
    ddf: Episode[]
    diedrei: Episode[]
    kids: Episode[]
    sonderfolgen: Episode[]
    hoerbuecher: Episode[]
  }> {
    const [ddf, diedrei, kids, sonderfolgen, hoerbuecher] = await Promise.all([
      this.fetchEpisodes('folgen.json'),
      this.fetchEpisodes('folgen_diedrei.json'),
      this.fetchEpisodes('folgen_kids.json'),
      this.fetchEpisodes('sonderfolgen_ddf.json'),
      this.fetchEpisodes('hoerbuecher.json')
    ])

    return {
      ddf,
      diedrei,
      kids,
      sonderfolgen,
      hoerbuecher
    }
  }
}

export default new EpisodeService()
