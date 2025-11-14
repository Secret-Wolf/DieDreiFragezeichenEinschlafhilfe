<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import AppHeader from '@/components/AppHeader.vue'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()

onMounted(async () => {
  // Try to fetch user if token exists
  await authStore.fetchUser()

  // Load settings (works offline and online)
  await settingsStore.loadSettings()

  // Load filtered episodes (works offline and online)
  await settingsStore.loadFilteredEpisodes()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppHeader v-if="authStore.isAuthenticated" />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Theme-based color variables */
:root {
  --theme-color: #E53935;
}

[data-theme="bob"] {
  --theme-color: #E53935;
}

[data-theme="peter"] {
  --theme-color: #1E88E5;
}

[data-theme="justus"] {
  --theme-color: #424242;
}
</style>
