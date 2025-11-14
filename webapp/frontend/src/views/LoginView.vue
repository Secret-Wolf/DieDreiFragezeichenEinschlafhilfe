<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await authStore.login({
    email: email.value,
    password: password.value
  })

  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="card max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Die drei ??? Einschlafhilfe
        </h1>
        <p class="text-gray-600">
          Melde dich an um fortzufahren
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            E-Mail
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input-field"
            placeholder="dein@email.de"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Passwort
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input-field"
            placeholder="••••••••"
          />
        </div>

        <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-600 text-sm">{{ authStore.error }}</p>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? 'Laden...' : 'Anmelden' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Noch kein Konto?
          <router-link to="/register" class="text-blue-600 hover:text-blue-700 font-medium">
            Jetzt registrieren
          </router-link>
        </p>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-200 text-center">
        <p class="text-sm text-gray-500">
          Diese App ist ein Fan-Projekt und steht in keiner Verbindung zu Europa/Sony Music.
        </p>
      </div>
    </div>
  </div>
</template>
