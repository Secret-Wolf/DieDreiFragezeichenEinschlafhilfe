import { Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../types'

export class SettingsController {
  async getSettings(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id

      let settings = await prisma.userSettings.findUnique({
        where: { userId }
      })

      // Create default settings if they don't exist
      if (!settings) {
        settings = await prisma.userSettings.create({
          data: { userId }
        })
      }

      // Transform to frontend format
      const response = {
        theme: settings.theme,
        onlineMode: settings.onlineMode,
        customRangeDDF: {
          min: settings.customRangeDDFMin,
          max: settings.customRangeDDFMax
        },
        customRangeDieDrei: {
          min: settings.customRangeDieDreiMin,
          max: settings.customRangeDieDreiMax
        },
        customRangeKids: {
          min: settings.customRangeKidsMin,
          max: settings.customRangeKidsMax
        }
      }

      res.json(response)
    } catch (error) {
      console.error('Get settings error:', error)
      res.status(500).json({ message: 'Fehler beim Laden der Einstellungen' })
    }
  }

  async updateSettings(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { theme, onlineMode, customRangeDDF, customRangeDieDrei, customRangeKids } = req.body

      const settings = await prisma.userSettings.upsert({
        where: { userId },
        update: {
          theme: theme || undefined,
          onlineMode: onlineMode !== undefined ? onlineMode : undefined,
          customRangeDDFMin: customRangeDDF?.min || undefined,
          customRangeDDFMax: customRangeDDF?.max || undefined,
          customRangeDieDreiMin: customRangeDieDrei?.min || undefined,
          customRangeDieDreiMax: customRangeDieDrei?.max || undefined,
          customRangeKidsMin: customRangeKids?.min || undefined,
          customRangeKidsMax: customRangeKids?.max || undefined
        },
        create: {
          userId,
          theme: theme || 'bob',
          onlineMode: onlineMode !== undefined ? onlineMode : true,
          customRangeDDFMin: customRangeDDF?.min || 1,
          customRangeDDFMax: customRangeDDF?.max || 228,
          customRangeDieDreiMin: customRangeDieDrei?.min || 1,
          customRangeDieDreiMax: customRangeDieDrei?.max || 8,
          customRangeKidsMin: customRangeKids?.min || 1,
          customRangeKidsMax: customRangeKids?.max || 96
        }
      })

      // Transform to frontend format
      const response = {
        theme: settings.theme,
        onlineMode: settings.onlineMode,
        customRangeDDF: {
          min: settings.customRangeDDFMin,
          max: settings.customRangeDDFMax
        },
        customRangeDieDrei: {
          min: settings.customRangeDieDreiMin,
          max: settings.customRangeDieDreiMax
        },
        customRangeKids: {
          min: settings.customRangeKidsMin,
          max: settings.customRangeKidsMax
        }
      }

      res.json(response)
    } catch (error) {
      console.error('Update settings error:', error)
      res.status(500).json({ message: 'Fehler beim Speichern der Einstellungen' })
    }
  }
}

export default new SettingsController()
