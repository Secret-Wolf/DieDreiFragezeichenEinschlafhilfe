<script setup lang="ts">
const version = '1.0.0'
const githubUrl = 'https://github.com/Secret-Wolf/DieDreiFragezeichenEinschlafhilfe'
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Über die App</h1>

      <div class="space-y-6">
        <!-- App Info -->
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Die drei ??? Einschlafhilfe
          </h2>
          <p class="text-gray-600 mb-2">Version: {{ version }}</p>
          <p class="text-gray-700 leading-relaxed">
            Diese App hilft dir dabei, die perfekte Folge von "Die drei ???" zum Einschlafen zu finden.
            Wähle aus verschiedenen Kategorien und Bereichen und lass dir zufällig eine Folge vorschlagen.
          </p>
        </div>

        <!-- Features -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Zufällige Folgenvorschläge aus verschiedenen Bereichen
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Spotify-Integration für direktes Abspielen
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Filter-System zum Ausblenden ungewünschter Folgen
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Eigene Bereiche konfigurieren
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Drei Farbthemen (Bob, Peter, Justus)
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Online & Offline Modus
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              Unterstützung für: Die drei ???, Die Dr3i, Die drei ??? Kids, Sonderfolgen, Hörbücher
            </li>
          </ul>
        </div>

        <!-- Disclaimer -->
        <div class="card bg-yellow-50 border-2 border-yellow-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Wichtiger Hinweis</h2>
          <p class="text-gray-700 leading-relaxed">
            Diese App ist ein inoffizielles Fan-Projekt und steht in keiner Verbindung zu Europa/Sony Music
            oder den Rechteinhabern von "Die drei ???". Alle Marken und Urheberrechte gehören ihren jeweiligen Eigentümern.
          </p>
        </div>

        <!-- Links -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Links</h2>
          <div class="space-y-3">
            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub Repository
            </a>

            <a
              href="https://www.rocky-beach.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
              Rocky Beach - Die drei ??? Datenbank
            </a>

            <a
              href="https://open.spotify.com/artist/5Rb51JeNy4YYWFUEx9iFwz"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Die drei ??? auf Spotify
            </a>
          </div>
        </div>

        <!-- Contact -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Kontakt & Feedback</h2>
          <p class="text-gray-700">
            Hast du Fragen, Anregungen oder Fehler gefunden?
            Erstelle gerne ein Issue auf GitHub oder kontaktiere den Entwickler.
          </p>
        </div>

        <!-- Data Privacy -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Datenschutz</h2>
          <p class="text-gray-700 leading-relaxed">
            Diese App speichert deine Einstellungen und Filter-Präferenzen in deinem Account.
            Es werden keine Daten an Dritte weitergegeben. Die App verwendet die Spotify-API nur
            zum Öffnen von Episode-Links.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
