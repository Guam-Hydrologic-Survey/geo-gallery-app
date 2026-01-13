import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        proxy: {
            // proxy for API endpoints 
            '/api': {
                target: 'http://localhost:3000', // backend API server
                changeOrigin: true, 
            },
            // proxy for static photos
            '/photos': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            // proxy for static text files
            '/descriptions': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        }
    },
    plugins: [
        tailwindcss(),
    ],
    build: {
        outDir: 'dist',
    }
})