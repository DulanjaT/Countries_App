# 🌍 OctaveFlow - Country Explorer App

OctaveFlow is a full-stack web application that allows users to explore countries, view capital city weather data, and manage their favorite destinations. Built with a modern tech stack and a clean, responsive UI, OctaveFlow is ideal for travelers, geography enthusiasts, or anyone curious about the world.

---

## 🧭 What Is OctaveFlow?

OctaveFlow is designed as an educational and practical tool to:
- Browse and search countries around the world
- View capital city weather powered by an external API
- Favorite countries for quick access
- Authenticate securely (email/password + Google login)
- Toggle between dark and light modes for better accessibility

**Target Group**  
The app is perfect for:
- General users who enjoy discovering countries and weather info

---

## 🚀 Technologies Used

**Frontend:**
- React 18 (TypeScript)
- React Router 7
- MUI (Material UI) for UI components
- Redux Toolkit (state management)
- Supabase (auth & backend)
- Axios (HTTP requests)

**Backend (via Supabase):**
- Postgres DB for favorites
- Supabase Auth for secure login (email/password, Google OAuth)

**Other:**

- OpenWeather API for real-time weather
- Vite for dev server and builds

---

## ⚙️ Setup and Usage

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/octaveflow.git
cd octaveflow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables

Create a `.env` file at the root and add:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_OPENWEATHER_KEY=your-weather-api-key
```

> Replace the values with your actual Supabase and OpenWeather keys.

### 4. Run the development server
```bash
npm run dev
```

This will start the app at `http://localhost:5173`.

### 5. Build for production
```bash
npm run build
```

The production-ready app will be in the `dist/` folder.
