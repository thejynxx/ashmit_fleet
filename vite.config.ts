import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    /**
     * For GitHub Pages deployment, the 'base' must match your repository name.
     * Since your repository is named 'ashmit_fleet', we set the base path accordingly.
     */
    base: '/ashmit_fleet/',
    /**
     * Optimization for cleaner builds
     */
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
    /**
     * Development server configuration
     */
    server: {
        port: 5173,
        host: true,
    },
});