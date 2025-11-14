<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const themeClass = () => {
  switch (settingsStore.theme) {
    case 'bob':
      return 'bg-bob'
    case 'peter':
      return 'bg-peter'
    case 'justus':
      return 'bg-justus'
    default:
      return 'bg-bob'
  }
}
</script>

<template>
  <header :class="['shadow-md text-white', themeClass()]">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="text-2xl font-bold hover:opacity-80 transition-opacity">
            Die drei ??? Einschlafhilfe
          </router-link>
        </div>

        <nav class="flex items-center space-x-6">
          <router-link
            to="/"
            class="hover:opacity-80 transition-opacity font-medium"
          >
            Home
          </router-link>
          <router-link
            to="/filter"
            class="hover:opacity-80 transition-opacity font-medium"
          >
            Filter
          </router-link>
          <router-link
            to="/settings"
            class="hover:opacity-80 transition-opacity font-medium"
          >
            Einstellungen
          </router-link>
          <router-link
            to="/about"
            class="hover:opacity-80 transition-opacity font-medium"
          >
            Info
          </router-link>

          <div class="flex items-center space-x-4 ml-4 pl-4 border-l border-white/30">
            <span class="text-sm opacity-90">{{ authStore.user?.username }}</span>
            <button
              @click="logout"
              class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
a.router-link-active {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
