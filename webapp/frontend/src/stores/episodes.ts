import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/api'
import type { Episode, EpisodeType, Category } from '@/types'

export const useEpisodesStore = defineStore('episodes', () => {
  const ddfEpisodes = ref<Episode[]>([])
  const diedreiEpisodes = ref<Episode[]>([])
  const kidsEpisodes = ref<Episode[]>([])
  const sonderfolgenEpisodes = ref<Episode[]>([])
  const hoerbuchEpisodes = ref<Episode[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const allEpisodes = computed(() => ({
    ddf: ddfEpisodes.value,
    diedrei: diedreiEpisodes.value,
    kids: kidsEpisodes.value,
    sonderfolgen: sonderfolgenEpisodes.value,
    hoerbuecher: hoerbuchEpisodes.value
  }))

  async function loadAllEpisodes() {
    loading.value = true
    error.value = null

    try {
      const data = await apiService.getAllEpisodes()
      ddfEpisodes.value = data.ddf
      diedreiEpisodes.value = data.diedrei
      kidsEpisodes.value = data.kids
      sonderfolgenEpisodes.value = data.sonderfolgen
      hoerbuchEpisodes.value = data.hoerbuecher
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Laden der Folgen'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function loadEpisodesByType(type: EpisodeType) {
    loading.value = true
    error.value = null

    try {
      const episodes = await apiService.getEpisodes(type)

      switch (type) {
        case 'ddf':
          ddfEpisodes.value = episodes
          break
        case 'diedrei':
          diedreiEpisodes.value = episodes
          break
        case 'kids':
          kidsEpisodes.value = episodes
          break
        case 'sonderfolge':
          sonderfolgenEpisodes.value = episodes
          break
        case 'hoerbuch':
          hoerbuchEpisodes.value = episodes
          break
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Laden der Folgen'
      throw err
    } finally {
      loading.value = false
    }
  }

  function getEpisodesByRange(type: EpisodeType, min: number, max: number): Episode[] {
    let episodes: Episode[] = []

    switch (type) {
      case 'ddf':
        episodes = ddfEpisodes.value
        break
      case 'diedrei':
        episodes = diedreiEpisodes.value
        break
      case 'kids':
        episodes = kidsEpisodes.value
        break
      case 'sonderfolge':
        episodes = sonderfolgenEpisodes.value
        break
      case 'hoerbuch':
        episodes = hoerbuchEpisodes.value
        break
    }

    return episodes.filter((ep) => {
      const num = parseInt(ep.nummer)
      return num >= min && num <= max
    })
  }

  function getRandomEpisode(
    category: Category,
    customRange?: { min: number; max: number },
    filteredNummers: string[] = []
  ): Episode | null {
    let availableEpisodes: Episode[] = []

    switch (category) {
      case '1-50':
        availableEpisodes = getEpisodesByRange('ddf', 1, 50)
        break
      case '1-100':
        availableEpisodes = getEpisodesByRange('ddf', 1, 100)
        break
      case '1-150':
        availableEpisodes = getEpisodesByRange('ddf', 1, 150)
        break
      case 'all':
        availableEpisodes = ddfEpisodes.value
        break
      case 'diedrei':
        availableEpisodes = diedreiEpisodes.value
        break
      case 'kids':
        availableEpisodes = kidsEpisodes.value
        break
      case 'hoerbuch':
        availableEpisodes = hoerbuchEpisodes.value
        break
      case 'custom':
        if (customRange) {
          availableEpisodes = getEpisodesByRange('ddf', customRange.min, customRange.max)
        }
        break
    }

    // Filter out hidden episodes
    availableEpisodes = availableEpisodes.filter(
      (ep) => !filteredNummers.includes(ep.nummer)
    )

    if (availableEpisodes.length === 0) return null

    const randomIndex = Math.floor(Math.random() * availableEpisodes.length)
    return availableEpisodes[randomIndex] || null
  }

  return {
    ddfEpisodes,
    diedreiEpisodes,
    kidsEpisodes,
    sonderfolgenEpisodes,
    hoerbuchEpisodes,
    allEpisodes,
    loading,
    error,
    loadAllEpisodes,
    loadEpisodesByType,
    getEpisodesByRange,
    getRandomEpisode
  }
})
