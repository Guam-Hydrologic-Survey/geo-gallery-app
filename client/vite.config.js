import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
       // host: '0.0.0.0', 
       // port: 5173,

	allowedHosts: 'all',

        proxy: {
            // proxy for API endpoints 
            '/api': {
                target: 'https://geo-gallery-app-backend.loca.lt', // backend API server
                changeOrigin: true, 
            },
            // proxy for static photos
            '/photos': {
                target: 'https://geo-gallery-app-backend.loca.lt',
                changeOrigin: true
            },
            // proxy for static text files
            '/descriptions': {
                target: 'https://geo-gallery-app-backend.loca.lt',
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
