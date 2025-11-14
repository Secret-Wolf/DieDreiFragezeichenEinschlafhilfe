<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useEpisodesStore } from '@/stores/episodes'
import type { EpisodeType } from '@/types'

const settingsStore = useSettingsStore()
const episodesStore = useEpisodesStore()

const getEpisodeName = (nummer: string, type: EpisodeType) => {
  let episodes: any[] = []

  switch (type) {
    case 'ddf':
      episodes = episodesStore.ddfEpisodes
      break
    case 'diedrei':
      episodes = episodesStore.diedreiEpisodes
      break
    case 'kids':
      episodes = episodesStore.kidsEpisodes
      break
    case 'sonderfolge':
      episodes = episodesStore.sonderfolgenEpisodes
      break
    case 'hoerbuch':
      episodes = episodesStore.hoerbuchEpisodes
      break
  }

  const episode = episodes.find(ep => ep.nummer === nummer)
  return episode?.name || `Folge ${nummer}`
}

const groupedFilters = computed(() => {
  const groups: Record<EpisodeType, typeof settingsStore.filteredEpisodes> = {
    'ddf': [],
    'diedrei': [],
    'kids': [],
    'sonderfolge': [],
    'hoerbuch': []
  }

  settingsStore.filteredEpisodes.forEach(filter => {
    if (groups[filter.episodeType]) {
      groups[filter.episodeType].push(filter)
    }
  })

  return groups
})

const removeFilter = async (filterId: string) => {
  try {
    await settingsStore.removeFilteredEpisode(filterId)
  } catch (error) {
    console.error('Error removing filter:', error)
  }
}

const clearAllFilters = async () => {
  if (!confirm('Möchtest du wirklich alle Filter löschen?')) return

  try {
    const filterIds = settingsStore.filteredEpisodes
      .map(f => f.id)
      .filter((id): id is string => id !== undefined)

    for (const id of filterIds) {
      await settingsStore.removeFilteredEpisode(id)
    }
  } catch (error) {
    console.error('Error clearing filters:', error)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Folgen-Filter</h1>
          <p class="text-gray-600 mt-2">
            Verwalte deine ausgeblendeten Folgen
          </p>
        </div>

        <button
          v-if="settingsStore.filteredEpisodes.length > 0"
          @click="clearAllFilters"
          class="btn-primary bg-red-600 hover:bg-red-700 text-white"
        >
          Alle Filter löschen
        </button>
      </div>

      <div v-if="settingsStore.filteredEpisodes.length === 0" class="card text-center py-12">
        <p class="text-gray-600 text-lg">Keine Folgen ausgeblendet</p>
        <p class="text-gray-500 text-sm mt-2">
          Blende Folgen aus, die du nicht hören möchtest, indem du auf der Hauptseite auf "Folge ausblenden" klickst
        </p>
      </div>

      <div v-else class="space-y-6">
        <!-- DDF Folgen -->
        <div v-if="groupedFilters.ddf.length > 0" class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Die drei ??? ({{ groupedFilters.ddf.length }})
          </h2>
          <div class="space-y-2">
            <div
              v-for="filter in groupedFilters.ddf"
              :key="filter.id"
              class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <span class="font-medium text-gray-900">Folge {{ filter.episodeNummer }}</span>
                <span class="text-gray-600 ml-2">{{ getEpisodeName(filter.episodeNummer, filter.episodeType) }}</span>
              </div>
              <button
                v-if="filter.id"
                @click="removeFilter(filter.id)"
                class="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Entfernen
              </button>
            </div>
          </div>
        </div>

        <!-- Die Dr3i Folgen -->
        <div v-if="groupedFilters.diedrei.length > 0" class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Die Dr3i ({{ groupedFilters.diedrei.length }})
          </h2>
          <div class="space-y-2">
            <div
              v-for="filter in groupedFilters.diedrei"
              :key="filter.id"
              class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <span class="font-medium text-gray-900">Folge {{ filter.episodeNummer }}</span>
                <span class="text-gray-600 ml-2">{{ getEpisodeName(filter.episodeNummer, filter.episodeType) }}</span>
              </div>
              <button
                v-if="filter.id"
                @click="removeFilter(filter.id)"
                class="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Entfernen
              </button>
            </div>
          </div>
        </div>

        <!-- Kids Folgen -->
        <div v-if="groupedFilters.kids.length > 0" class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Die drei ??? Kids ({{ groupedFilters.kids.length }})
          </h2>
          <div class="space-y-2">
            <div
              v-for="filter in groupedFilters.kids"
              :key="filter.id"
              class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <span class="font-medium text-gray-900">Folge {{ filter.episodeNummer }}</span>
                <span class="text-gray-600 ml-2">{{ getEpisodeName(filter.episodeNummer, filter.episodeType) }}</span>
              </div>
              <button
                v-if="filter.id"
                @click="removeFilter(filter.id)"
                class="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Entfernen
              </button>
            </div>
          </div>
        </div>

        <!-- Sonderfolgen -->
        <div v-if="groupedFilters.sonderfolge.length > 0" class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Sonderfolgen ({{ groupedFilters.sonderfolge.length }})
          </h2>
          <div class="space-y-2">
            <div
              v-for="filter in groupedFilters.sonderfolge"
              :key="filter.id"
              class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <span class="font-medium text-gray-900">{{ getEpisodeName(filter.episodeNummer, filter.episodeType) }}</span>
              </div>
              <button
                v-if="filter.id"
                @click="removeFilter(filter.id)"
                class="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Entfernen
              </button>
            </div>
          </div>
        </div>

        <!-- Hörbücher -->
        <div v-if="groupedFilters.hoerbuch.length > 0" class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Hörbücher ({{ groupedFilters.hoerbuch.length }})
          </h2>
          <div class="space-y-2">
            <div
              v-for="filter in groupedFilters.hoerbuch"
              :key="filter.id"
              class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <span class="font-medium text-gray-900">{{ getEpisodeName(filter.episodeNummer, filter.episodeType) }}</span>
              </div>
              <button
                v-if="filter.id"
                @click="removeFilter(filter.id)"
                class="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Entfernen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
