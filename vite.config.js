import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // For custom domain root deployment, use '/'
  base: '/',
  plugins: [react()],
})
