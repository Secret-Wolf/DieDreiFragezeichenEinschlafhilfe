<script setup lang="ts">
import { computed } from 'vue'
import type { Episode } from '@/types'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps<{
  episode: Episode | null
  loading?: boolean
}>()

const emit = defineEmits<{
  refresh: []
  toggleFilter: []
}>()

const settingsStore = useSettingsStore()

const coverUrl = computed(() => {
  if (!props.episode) return ''

  const baseUrl = 'https://api.citroncode.com/android/ddf/v5/cover'

  switch (props.episode.type) {
    case 'diedrei':
      return `${baseUrl}/cover_diedrei_${props.episode.nummer}.png`
    case 'kids':
      return `${baseUrl}/cover_kids_${props.episode.nummer}.png`
    case 'sonderfolge':
      return `${baseUrl}/cover_sonderfolge_${props.episode.nummer}.png`
    case 'hoerbuch':
      return `${baseUrl}/cover_hoerbuch_${props.episode.nummer}.png`
    default:
      return `${baseUrl}/cover_${props.episode.nummer}.png`
  }
})

const spotifyUrl = computed(() => {
  if (!props.episode?.spotify) return null

  // Check if it's already a full URL
  if (props.episode.spotify.startsWith('http')) {
    return props.episode.spotify
  }

  // Otherwise, it's a Spotify ID
  return `https://open.spotify.com/album/${props.episode.spotify}`
})

const isFiltered = computed(() => {
  return props.episode
    ? settingsStore.isEpisodeFiltered(props.episode.nummer)
    : false
})

const openSpotify = () => {
  if (spotifyUrl.value) {
    window.open(spotifyUrl.value, '_blank')
  }
}

const openRockyBeach = () => {
  if (props.episode) {
    window.open(`https://www.rocky-beach.com/hoerspiel/${props.episode.nummer}.html`, '_blank')
  }
}
</script>

<template>
  <div class="card max-w-2xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <p class="mt-4 text-gray-600">Lade Folge...</p>
    </div>

    <div v-else-if="!episode" class="text-center py-12">
      <p class="text-gray-600 text-lg">Keine Folge verfügbar</p>
      <p class="text-gray-500 text-sm mt-2">Wähle eine Kategorie und klicke auf "Neue Folge"</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Episode Cover -->
      <div class="flex justify-center">
        <img
          :src="coverUrl"
          :alt="`Cover ${episode.name}`"
          class="rounded-lg shadow-lg max-w-sm w-full object-cover"
          @error="($event.target as HTMLImageElement).src = '/placeholder-cover.png'"
        />
      </div>

      <!-- Episode Info -->
      <div class="text-center space-y-2">
        <h2 class="text-3xl font-bold text-gray-900">
          Folge {{ episode.nummer }}
        </h2>
        <h3 class="text-xl text-gray-700">
          {{ episode.name }}
        </h3>
      </div>

      <!-- Description -->
      <div
        v-if="episode.beschreibung"
        class="bg-gray-50 rounded-lg p-4"
      >
        <p class="text-gray-700 leading-relaxed">
          {{ episode.beschreibung }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          @click="emit('refresh')"
          class="btn-primary bg-blue-600 hover:bg-blue-700 text-white"
        >
          🔄 Neue Folge
        </button>

        <button
          v-if="spotifyUrl"
          @click="openSpotify"
          class="btn-primary bg-green-600 hover:bg-green-700 text-white"
        >
          🎵 Auf Spotify öffnen
        </button>

        <button
          @click="openRockyBeach"
          class="btn-primary bg-gray-600 hover:bg-gray-700 text-white"
        >
          ℹ️ Details
        </button>

        <button
          @click="emit('toggleFilter')"
          :class="[
            'btn-primary',
            isFiltered
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          ]"
        >
          {{ isFiltered ? '✓ Filter entfernen' : '🚫 Folge ausblenden' }}
        </button>
      </div>
    </div>
  </div>
</template>
