<script setup lang="ts">
import { ref, computed } from 'vue'
import { Category, type CategoryConfig } from '@/types'
import { useSettingsStore } from '@/stores/settings'

const emit = defineEmits<{
  categoryChange: [category: Category]
}>()

const settingsStore = useSettingsStore()
const selectedCategory = ref<Category>(Category.All)

const categories = computed<CategoryConfig[]>(() => [
  {
    id: Category.Range1_50,
    label: 'Folgen 1-50',
    type: 'ddf',
    range: { min: 1, max: 50 }
  },
  {
    id: Category.Range1_100,
    label: 'Folgen 1-100',
    type: 'ddf',
    range: { min: 1, max: 100 }
  },
  {
    id: Category.Range1_150,
    label: 'Folgen 1-150',
    type: 'ddf',
    range: { min: 1, max: 150 }
  },
  {
    id: Category.All,
    label: 'Alle Folgen',
    type: 'ddf'
  },
  {
    id: Category.Custom,
    label: `Eigener Bereich (${settingsStore.customRangeDDF.min}-${settingsStore.customRangeDDF.max})`,
    type: 'ddf',
    range: settingsStore.customRangeDDF
  },
  {
    id: Category.DieDrei,
    label: 'Die Dr3i',
    type: 'diedrei'
  },
  {
    id: Category.Kids,
    label: 'Die drei ??? Kids',
    type: 'kids'
  },
  {
    id: Category.Hoerbuch,
    label: 'Hörbücher',
    type: 'hoerbuch'
  }
])

const selectCategory = (category: Category) => {
  selectedCategory.value = category
  emit('categoryChange', category)
}

const previousCategory = () => {
  const currentIndex = categories.value.findIndex(c => c.id === selectedCategory.value)
  const newIndex = currentIndex > 0 ? currentIndex - 1 : categories.value.length - 1
  selectCategory(categories.value[newIndex].id)
}

const nextCategory = () => {
  const currentIndex = categories.value.findIndex(c => c.id === selectedCategory.value)
  const newIndex = currentIndex < categories.value.length - 1 ? currentIndex + 1 : 0
  selectCategory(categories.value[newIndex].id)
}

const currentCategoryLabel = computed(() => {
  const category = categories.value.find(c => c.id === selectedCategory.value)
  return category?.label || 'Alle Folgen'
})

defineExpose({
  selectedCategory
})
</script>

<template>
  <div class="card max-w-4xl mx-auto">
    <div class="flex items-center justify-between gap-4">
      <!-- Previous Button -->
      <button
        @click="previousCategory"
        class="btn-primary bg-gray-600 hover:bg-gray-700 text-white text-2xl px-6"
        aria-label="Vorherige Kategorie"
      >
        ◀
      </button>

      <!-- Category Display -->
      <div class="flex-1 text-center">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ currentCategoryLabel }}
        </h2>
      </div>

      <!-- Next Button -->
      <button
        @click="nextCategory"
        class="btn-primary bg-gray-600 hover:bg-gray-700 text-white text-2xl px-6"
        aria-label="Nächste Kategorie"
      >
        ▶
      </button>
    </div>

    <!-- Category Pills (Optional - for direct selection) -->
    <div class="mt-6 flex flex-wrap gap-2 justify-center">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          selectedCategory === category.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ category.label }}
      </button>
    </div>
  </div>
</template>
