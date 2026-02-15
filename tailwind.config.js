/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'electric-blue': '#0099FF',
                'emergency-orange': '#FF6B35',
                'dark-bg': '#0F1419',
                'dark-card': '#1A1F2E',
                'dark-border': '#2D3748',
            },
        },
    },
    plugins: [],
};
