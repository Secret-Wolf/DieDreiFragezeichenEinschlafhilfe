import { Request, Response } from 'express'
import episodeService from '../services/episodeService'
import { EpisodeType } from '../types'

export class EpisodeController {
  async getAllEpisodes(req: Request, res: Response) {
    try {
      const episodes = await episodeService.getAllEpisodes()
      res.json(episodes)
    } catch (error) {
      console.error('Get all episodes error:', error)
      res.status(500).json({ message: 'Fehler beim Laden der Folgen' })
    }
  }

  async getEpisodesByType(req: Request, res: Response) {
    try {
      const { type } = req.params

      if (!Object.values(EpisodeType).includes(type as EpisodeType)) {
        return res.status(400).json({ message: 'Ungültiger Folgentyp' })
      }

      const episodes = await episodeService.getEpisodesByType(type as EpisodeType)
      res.json(episodes)
    } catch (error) {
      console.error('Get episodes by type error:', error)
      res.status(500).json({ message: 'Fehler beim Laden der Folgen' })
    }
  }
}

export default new EpisodeController()
