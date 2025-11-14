# Die drei ??? Einschlafhilfe - WebApp

Eine moderne WebApp, die dir hilft, die perfekte "Die drei ???" Folge zum Einschlafen zu finden.

## 🌟 Features

- **Zufallsvorschläge** aus verschiedenen Bereichen (1-50, 1-100, alle Folgen, Die Dr3i, Kids, Hörbücher)
- **Spotify-Integration** für direktes Abspielen
- **Filter-System** zum Ausblenden ungewünschter Folgen
- **Eigene Bereiche** konfigurieren
- **3 Farbthemen** (Bob, Peter, Justus)
- **User-Login** für persistente Daten über Geräte hinweg
- **Responsive Design** für Mobile, Tablet & Desktop
- **Online/Offline Modus**

## 📁 Projekt-Struktur

```
webapp/
├── frontend/          # Vue 3 + TypeScript Frontend
├── backend/           # Node.js + Express + TypeScript Backend
├── docker-compose.yml # Docker Setup
└── README.md          # Diese Datei
```

## 🚀 Quick Start (Entwicklung)

### Voraussetzungen

- Node.js 20+
- PostgreSQL 16+ (oder Docker)
- npm oder yarn

### 1. Repository klonen

```bash
cd webapp
```

### 2. Backend Setup

```bash
cd backend

# Dependencies installieren
npm install

# .env Datei erstellen
cp .env.example .env

# .env bearbeiten und Datenbank-URL anpassen:
# DATABASE_URL="postgresql://user:password@localhost:5432/ddf_einschlafhilfe"
# JWT_SECRET="dein-geheimer-schlüssel"

# Prisma Setup
npx prisma generate
npx prisma migrate dev

# Backend starten
npm run dev
```

Backend läuft auf: http://localhost:3000

### 3. Frontend Setup

```bash
cd frontend

# Dependencies installieren
npm install

# .env Datei erstellen (optional, Defaults funktionieren)
cp .env.example .env

# Frontend starten
npm run dev
```

Frontend läuft auf: http://localhost:5173

## 🐳 Docker Deployment (Empfohlen für Produktion)

### Mit Docker Compose (einfachste Methode)

```bash
# Im webapp/ Verzeichnis:
docker-compose up -d
```

Das startet:
- PostgreSQL auf Port 5432
- Backend API auf Port 3000
- Frontend auf Port 80

Zugriff: http://localhost

### Environment-Variablen für Produktion anpassen

Bearbeite `docker-compose.yml` und ändere:
- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `CORS_ORIGIN` (deine Domain)

### Docker Commands

```bash
# Alles starten
docker-compose up -d

# Logs anschauen
docker-compose logs -f

# Stoppen
docker-compose down

# Stoppen + Datenbank löschen
docker-compose down -v
```

## 🛠️ Entwicklung

### Backend Endpoints

- `POST /api/auth/register` - Registrierung
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Aktueller User
- `GET /api/episodes/all` - Alle Folgen laden
- `GET /api/episodes/:type` - Folgen nach Typ (ddf, diedrei, kids, etc.)
- `GET /api/filters` - User's Filter abrufen
- `POST /api/filters` - Filter hinzufügen
- `DELETE /api/filters/:id` - Filter entfernen
- `GET /api/settings` - Einstellungen abrufen
- `PUT /api/settings` - Einstellungen speichern

### Database Migrations

```bash
cd backend

# Neue Migration erstellen
npx prisma migrate dev --name migration_name

# Prisma Studio öffnen (DB GUI)
npx prisma studio
```

### Build für Produktion

#### Frontend

```bash
cd frontend
npm run build
# Gebuildete Files in frontend/dist/
```

#### Backend

```bash
cd backend
npm run build
# Gebuildete Files in backend/dist/
```

## 📊 Technologie-Stack

### Frontend
- **Vue 3** (Composition API)
- **TypeScript**
- **Vite** (Build Tool)
- **Pinia** (State Management)
- **Vue Router** (Routing)
- **TailwindCSS** (Styling)
- **Axios** (HTTP Client)

### Backend
- **Node.js**
- **Express** (Web Framework)
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (Datenbank)
- **JWT** (Authentication)
- **bcryptjs** (Password Hashing)

### DevOps
- **Docker** & **Docker Compose**
- **Nginx** (Frontend Webserver)

## 🔧 Konfiguration

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ddf_einschlafhilfe"
JWT_SECRET="your-super-secret-key"
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

## 📱 Progressive Web App (PWA)

Die App kann als PWA installiert werden:
- **Android/iOS**: Im Browser auf "Zum Startbildschirm hinzufügen"
- **Desktop**: In Chrome auf das ⊕ Symbol in der Adressleiste

## 🔒 Sicherheit

- Passwörter werden mit bcrypt gehasht
- JWT-Tokens für Authentication
- CORS-Protection
- SQL Injection Protection durch Prisma ORM
- Input Validation

## 🐛 Bekannte Probleme

- Keine Offline-Funktionalität ohne Service Worker (geplant)
- Episoden-Daten kommen von externer API (citroncode.com)

## 📝 API-Quellen

Die Episoden-Daten werden von der API bezogen:
`https://api.citroncode.com/android/ddf/v5/`

Diese API wird auch von der Android-App verwendet.

## 🤝 Beitragen

1. Fork das Projekt
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📄 Lizenz

Dieses Projekt ist ein inoffizielles Fan-Projekt und steht in keiner Verbindung zu Europa/Sony Music oder den Rechteinhabern von "Die drei ???".

## 👨‍💻 Autor

Original Android App & WebApp Portierung

## 🙏 Danksagungen

- Europa/Sony Music für "Die drei ???"
- citroncode.com für die API
- Alle Fans der drei Detektive!

## 📮 Kontakt & Support

Bei Fragen oder Problemen erstelle ein Issue auf GitHub.

---

**Viel Spaß beim Einschlafen mit den drei ??? !** 🔍🌙
