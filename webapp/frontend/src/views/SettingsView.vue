<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { Theme } from '@/types'

const settingsStore = useSettingsStore()

const localTheme = ref(settingsStore.theme)
const localOnlineMode = ref(settingsStore.onlineMode)
const localRangeDDF = ref({ ...settingsStore.customRangeDDF })
const localRangeDieDrei = ref({ ...settingsStore.customRangeDieDrei })
const localRangeKids = ref({ ...settingsStore.customRangeKids })

const saveMessage = ref('')

// Watch for changes and apply theme immediately
watch(localTheme, (newTheme) => {
  settingsStore.theme = newTheme
})

const saveSettings = async () => {
  settingsStore.theme = localTheme.value
  settingsStore.onlineMode = localOnlineMode.value
  settingsStore.customRangeDDF = { ...localRangeDDF.value }
  settingsStore.customRangeDieDrei = { ...localRangeDieDrei.value }
  settingsStore.customRangeKids = { ...localRangeKids.value }

  try {
    await settingsStore.saveSettings()
    saveMessage.value = 'Einstellungen gespeichert!'
    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
  } catch (error) {
    saveMessage.value = 'Fehler beim Speichern'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Einstellungen</h1>

      <div class="space-y-6">
        <!-- Theme Selection -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Farbthema</h2>
          <p class="text-gray-600 text-sm mb-4">
            Wähle dein bevorzugtes Farbthema basierend auf den drei Detektiven
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              @click="localTheme = Theme.Bob"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                localTheme === Theme.Bob
                  ? 'border-bob bg-bob/10'
                  : 'border-gray-200 hover:border-bob/50'
              ]"
            >
              <div class="w-12 h-12 bg-bob rounded-full mx-auto mb-2"></div>
              <p class="font-semibold">Bob Andrews</p>
              <p class="text-sm text-gray-600">Rot</p>
            </button>

            <button
              @click="localTheme = Theme.Peter"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                localTheme === Theme.Peter
                  ? 'border-peter bg-peter/10'
                  : 'border-gray-200 hover:border-peter/50'
              ]"
            >
              <div class="w-12 h-12 bg-peter rounded-full mx-auto mb-2"></div>
              <p class="font-semibold">Peter Shaw</p>
              <p class="text-sm text-gray-600">Blau</p>
            </button>

            <button
              @click="localTheme = Theme.Justus"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                localTheme === Theme.Justus
                  ? 'border-justus bg-justus/10'
                  : 'border-gray-200 hover:border-justus/50'
              ]"
            >
              <div class="w-12 h-12 bg-justus rounded-full mx-auto mb-2"></div>
              <p class="font-semibold">Justus Jonas</p>
              <p class="text-sm text-gray-600">Schwarz</p>
            </button>
          </div>
        </div>

        <!-- Online Mode -->
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Online-Modus</h2>
              <p class="text-gray-600 text-sm mt-1">
                Lade aktuelle Folgendaten vom Server
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="localOnlineMode"
                type="checkbox"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <!-- Custom Ranges -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Eigene Bereiche</h2>
          <p class="text-gray-600 text-sm mb-4">
            Stelle deine eigenen Folgenbereiche für die Zufallsauswahl ein
          </p>

          <div class="space-y-6">
            <!-- DDF Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Die drei ??? ({{ localRangeDDF.min }} - {{ localRangeDDF.max }})
              </label>
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Von</label>
                  <input
                    v-model.number="localRangeDDF.min"
                    type="number"
                    min="1"
                    :max="localRangeDDF.max"
                    class="input-field"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Bis</label>
                  <input
                    v-model.number="localRangeDDF.max"
                    type="number"
                    :min="localRangeDDF.min"
                    max="232"
                    class="input-field"
                  />
                </div>
              </div>
            </div>

            <!-- Die Dr3i Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Die Dr3i ({{ localRangeDieDrei.min }} - {{ localRangeDieDrei.max }})
              </label>
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Von</label>
                  <input
                    v-model.number="localRangeDieDrei.min"
                    type="number"
                    min="1"
                    :max="localRangeDieDrei.max"
                    class="input-field"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Bis</label>
                  <input
                    v-model.number="localRangeDieDrei.max"
                    type="number"
                    :min="localRangeDieDrei.min"
                    max="8"
                    class="input-field"
                  />
                </div>
              </div>
            </div>

            <!-- Kids Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Die drei ??? Kids ({{ localRangeKids.min }} - {{ localRangeKids.max }})
              </label>
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Von</label>
                  <input
                    v-model.number="localRangeKids.min"
                    type="number"
                    min="1"
                    :max="localRangeKids.max"
                    class="input-field"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Bis</label>
                  <input
                    v-model.number="localRangeKids.max"
                    type="number"
                    :min="localRangeKids.min"
                    max="96"
                    class="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex items-center gap-4">
          <button
            @click="saveSettings"
            :disabled="settingsStore.loading"
            class="btn-primary bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            {{ settingsStore.loading ? 'Speichern...' : 'Einstellungen speichern' }}
          </button>

          <div v-if="saveMessage" class="text-green-600 font-medium">
            {{ saveMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
