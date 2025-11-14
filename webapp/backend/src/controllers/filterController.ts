import { Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../types'

export class FilterController {
  async getFilters(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id

      const filters = await prisma.filteredEpisode.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })

      res.json(filters)
    } catch (error) {
      console.error('Get filters error:', error)
      res.status(500).json({ message: 'Fehler beim Laden der Filter' })
    }
  }

  async addFilter(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { episodeNummer, episodeType } = req.body

      if (!episodeNummer || !episodeType) {
        return res.status(400).json({ message: 'Folgennummer und Typ sind erforderlich' })
      }

      // Check if filter already exists
      const existing = await prisma.filteredEpisode.findUnique({
        where: {
          userId_episodeNummer_episodeType: {
            userId,
            episodeNummer,
            episodeType
          }
        }
      })

      if (existing) {
        return res.status(400).json({ message: 'Filter existiert bereits' })
      }

      const filter = await prisma.filteredEpisode.create({
        data: {
          userId,
          episodeNummer,
          episodeType
        }
      })

      res.status(201).json(filter)
    } catch (error) {
      console.error('Add filter error:', error)
      res.status(500).json({ message: 'Fehler beim Hinzufügen des Filters' })
    }
  }

  async removeFilter(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { id } = req.params

      const filter = await prisma.filteredEpisode.findUnique({
        where: { id }
      })

      if (!filter) {
        return res.status(404).json({ message: 'Filter nicht gefunden' })
      }

      if (filter.userId !== userId) {
        return res.status(403).json({ message: 'Nicht autorisiert' })
      }

      await prisma.filteredEpisode.delete({
        where: { id }
      })

      res.status(204).send()
    } catch (error) {
      console.error('Remove filter error:', error)
      res.status(500).json({ message: 'Fehler beim Entfernen des Filters' })
    }
  }
}

export default new FilterController()
