/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "tarot-dark": "#0f0f13",
                "tarot-panel": "#1a1a1f",
                "tarot-accent": "#d4af37", // Gold
                "tarot-text": "#e0e0e0",
                "tarot-primary": "#4f46e5", // Indigo
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Cinzel', 'serif'], // Good for tarot headers
            }
        },
    },
    plugins: [],
}
