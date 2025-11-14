import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { apiService } from '@/services/api'
import type { UserSettings, Theme, FilteredEpisode } from '@/types'
import { useAuthStore } from './auth'

export const useSettingsStore = defineStore('settings', () => {
  const authStore = useAuthStore()

  const theme = ref<Theme>('bob' as Theme)
  const onlineMode = ref(true)
  const customRangeDDF = ref({ min: 1, max: 228 })
  const customRangeDieDrei = ref({ min: 1, max: 8 })
  const customRangeKids = ref({ min: 1, max: 96 })
  const filteredEpisodes = ref<FilteredEpisode[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Apply theme to document
  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }, { immediate: true })

  async function loadSettings() {
    if (!authStore.isAuthenticated) {
      loadLocalSettings()
      return
    }

    loading.value = true
    error.value = null

    try {
      const settings = await apiService.getSettings()
      theme.value = settings.theme
      onlineMode.value = settings.onlineMode
      customRangeDDF.value = settings.customRangeDDF
      customRangeDieDrei.value = settings.customRangeDieDrei
      customRangeKids.value = settings.customRangeKids
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Laden der Einstellungen'
      loadLocalSettings()
    } finally {
      loading.value = false
    }
  }

  async function saveSettings() {
    if (!authStore.isAuthenticated) {
      saveLocalSettings()
      return
    }

    loading.value = true
    error.value = null

    try {
      const settings: UserSettings = {
        theme: theme.value,
        onlineMode: onlineMode.value,
        customRangeDDF: customRangeDDF.value,
        customRangeDieDrei: customRangeDieDrei.value,
        customRangeKids: customRangeKids.value
      }
      await apiService.updateSettings(settings)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Speichern der Einstellungen'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function loadFilteredEpisodes() {
    if (!authStore.isAuthenticated) {
      loadLocalFilters()
      return
    }

    loading.value = true
    error.value = null

    try {
      filteredEpisodes.value = await apiService.getFilteredEpisodes()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Laden der Filter'
      loadLocalFilters()
    } finally {
      loading.value = false
    }
  }

  async function addFilteredEpisode(episode: Omit<FilteredEpisode, 'id' | 'userId'>) {
    if (!authStore.isAuthenticated) {
      addLocalFilter(episode)
      return
    }

    try {
      const filtered = await apiService.addFilteredEpisode(episode)
      filteredEpisodes.value.push(filtered)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Hinzufügen des Filters'
      throw err
    }
  }

  async function removeFilteredEpisode(episodeId: string) {
    if (!authStore.isAuthenticated) {
      removeLocalFilter(episodeId)
      return
    }

    try {
      await apiService.removeFilteredEpisode(episodeId)
      filteredEpisodes.value = filteredEpisodes.value.filter((ep) => ep.id !== episodeId)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Fehler beim Entfernen des Filters'
      throw err
    }
  }

  function isEpisodeFiltered(nummer: string): boolean {
    return filteredEpisodes.value.some((ep) => ep.episodeNummer === nummer)
  }

  // Local storage fallback
  function loadLocalSettings() {
    const saved = localStorage.getItem('settings')
    if (saved) {
      const settings = JSON.parse(saved)
      theme.value = settings.theme || 'bob'
      onlineMode.value = settings.onlineMode !== false
      customRangeDDF.value = settings.customRangeDDF || { min: 1, max: 228 }
      customRangeDieDrei.value = settings.customRangeDieDrei || { min: 1, max: 8 }
      customRangeKids.value = settings.customRangeKids || { min: 1, max: 96 }
    }
  }

  function saveLocalSettings() {
    const settings = {
      theme: theme.value,
      onlineMode: onlineMode.value,
      customRangeDDF: customRangeDDF.value,
      customRangeDieDrei: customRangeDieDrei.value,
      customRangeKids: customRangeKids.value
    }
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  function loadLocalFilters() {
    const saved = localStorage.getItem('filteredEpisodes')
    if (saved) {
      filteredEpisodes.value = JSON.parse(saved)
    }
  }

  function addLocalFilter(episode: Omit<FilteredEpisode, 'id' | 'userId'>) {
    const id = `local_${Date.now()}`
    filteredEpisodes.value.push({ ...episode, id, userId: 'local' })
    localStorage.setItem('filteredEpisodes', JSON.stringify(filteredEpisodes.value))
  }

  function removeLocalFilter(episodeId: string) {
    filteredEpisodes.value = filteredEpisodes.value.filter((ep) => ep.id !== episodeId)
    localStorage.setItem('filteredEpisodes', JSON.stringify(filteredEpisodes.value))
  }

  return {
    theme,
    onlineMode,
    customRangeDDF,
    customRangeDieDrei,
    customRangeKids,
    filteredEpisodes,
    loading,
    error,
    loadSettings,
    saveSettings,
    loadFilteredEpisodes,
    addFilteredEpisode,
    removeFilteredEpisode,
    isEpisodeFiltered
  }
})
