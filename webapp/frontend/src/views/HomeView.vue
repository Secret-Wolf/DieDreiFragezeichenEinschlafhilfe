<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEpisodesStore } from '@/stores/episodes'
import { useSettingsStore } from '@/stores/settings'
import CategorySelector from '@/components/CategorySelector.vue'
import EpisodeCard from '@/components/EpisodeCard.vue'
import type { Episode, Category } from '@/types'

const episodesStore = useEpisodesStore()
const settingsStore = useSettingsStore()

const currentEpisode = ref<Episode | null>(null)
const currentCategory = ref<Category>('all')
const loading = ref(true)

const filteredEpisodeNumbers = computed(() => {
  return settingsStore.filteredEpisodes.map(ep => ep.episodeNummer)
})

onMounted(async () => {
  try {
    await episodesStore.loadAllEpisodes()
    generateRandomEpisode()
  } catch (error) {
    console.error('Error loading episodes:', error)
  } finally {
    loading.value = false
  }
})

const generateRandomEpisode = () => {
  loading.value = true

  const customRange = currentCategory.value === 'custom'
    ? settingsStore.customRangeDDF
    : undefined

  try {
    currentEpisode.value = episodesStore.getRandomEpisode(
      currentCategory.value,
      customRange,
      filteredEpisodeNumbers.value
    )
  } catch (error) {
    console.error('Error generating random episode:', error)
  } finally {
    loading.value = false
  }
}

const onCategoryChange = (category: Category) => {
  currentCategory.value = category
  generateRandomEpisode()
}

const toggleFilter = async () => {
  if (!currentEpisode.value) return

  const isFiltered = settingsStore.isEpisodeFiltered(currentEpisode.value.nummer)

  try {
    if (isFiltered) {
      // Remove filter
      const filtered = settingsStore.filteredEpisodes.find(
        ep => ep.episodeNummer === currentEpisode.value!.nummer
      )
      if (filtered?.id) {
        await settingsStore.removeFilteredEpisode(filtered.id)
      }
    } else {
      // Add filter
      await settingsStore.addFilteredEpisode({
        episodeNummer: currentEpisode.value.nummer,
        episodeType: currentEpisode.value.type
      })
    }

    // Generate new episode after filtering
    if (!isFiltered) {
      generateRandomEpisode()
    }
  } catch (error) {
    console.error('Error toggling filter:', error)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold text-gray-900">
          Die drei ??? Einschlafhilfe
        </h1>
        <p class="text-gray-600 text-lg">
          Finde die perfekte Folge zum Einschlafen
        </p>
      </div>

      <!-- Category Selector -->
      <CategorySelector @category-change="onCategoryChange" />

      <!-- Episode Card -->
      <EpisodeCard
        :episode="currentEpisode"
        :loading="loading"
        @refresh="generateRandomEpisode"
        @toggle-filter="toggleFilter"
      />

      <!-- Stats -->
      <div class="text-center text-sm text-gray-500">
        <p>
          {{ filteredEpisodeNumbers.length }} Folgen ausgeblendet
        </p>
      </div>
    </div>
  </div>
</template>
