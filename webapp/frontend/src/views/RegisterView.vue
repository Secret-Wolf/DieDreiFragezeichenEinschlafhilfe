<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref('')

const handleRegister = async () => {
  validationError.value = ''

  if (password.value !== confirmPassword.value) {
    validationError.value = 'Passwörter stimmen nicht überein'
    return
  }

  if (password.value.length < 6) {
    validationError.value = 'Passwort muss mindestens 6 Zeichen lang sein'
    return
  }

  const success = await authStore.register({
    username: username.value,
    email: email.value,
    password: password.value
  })

  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-500 to-pink-600">
    <div class="card max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Registrierung
        </h1>
        <p class="text-gray-600">
          Erstelle ein Konto um fortzufahren
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
            Benutzername
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="input-field"
            placeholder="JustusJonas"
          />
        </div>

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

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
            Passwort bestätigen
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="input-field"
            placeholder="••••••••"
          />
        </div>

        <div v-if="validationError || authStore.error" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-600 text-sm">{{ validationError || authStore.error }}</p>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full btn-primary bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? 'Laden...' : 'Registrieren' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Bereits ein Konto?
          <router-link to="/login" class="text-purple-600 hover:text-purple-700 font-medium">
            Jetzt anmelden
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
