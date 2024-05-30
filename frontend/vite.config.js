/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Copied from React Starter code
 * Source URL: https://github.com/osu-cs340-ecampus/react-starter-app/blob/main/App/frontend/vite.config.js
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get private, environment variables to modify configuration.
import dotenv from 'dotenv'

dotenv.config()

let PORT = process.env.VITE_PORT


if (process.env.DEV_VITE_PORT !== "3000") {
  PORT = process.env.DEV_VITE_PORT;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx"
  },
  server: {
    // Use VITE_PORT from your .env, or default to a port if not specified
    port: parseInt(PORT, 10) || 5173
  }
})