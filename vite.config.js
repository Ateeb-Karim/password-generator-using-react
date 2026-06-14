import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/Vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
})
