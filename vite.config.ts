import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/redfield/",
  //when we host this needs to be updated withdomain
  plugins: [react()],
})
