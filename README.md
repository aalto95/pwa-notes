# PWA Notes

A modern, fast, and installable note-taking application built as a Progressive Web App (PWA). This app is designed to work seamlessly online and offline, providing a native-app-like experience directly in your browser.

## ✨ Features

- **Progressive Web App (PWA):** Installable on your desktop or mobile device for easy access.
- **Offline First:** Thanks to IndexedDB and a Service Worker, you can create, view, and edit notes even without an internet connection.
- **Modern UI:** A clean and responsive user interface built with PrimeVue and Tailwind CSS.
- **Rich Note-Taking:** Simple yet powerful note management.
- **Type-Safe:** Developed entirely in TypeScript for a robust and maintainable codebase.

## 🚀 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) with `<script setup>`
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI:** [PrimeVue](https://primevue.org/) & [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **Offline Storage:** [Dexie.js](https://dexie.org/) (A wrapper for IndexedDB)
- **PWA:** [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Testing:** [Vitest](https://vitest.dev/)

## 📦 Project Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pwa-notes.git
    cd pwa-notes
    ```

2.  **Install dependencies:**
    ```bash
    npm ci
    ```

## 📜 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run serve`

Serves the production build locally to preview it.

### `npm run test`

Launches the test runner in watch mode.

### `npm run lint`

Lints the code to find and fix problems.

## 📄 License

This project is currently unlicensed.
