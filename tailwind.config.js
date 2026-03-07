/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./script.js"],
    theme: {
        extend: {
            colors: {
                primary: '#6c5ce7',
                'primary-dark': '#5d4aec',
                dark: '#1e1e1e',
                light: '#f8f9fa',
                'deep-dark': '#0C0B19',
            }
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Reativando para restaurar o comportamento do CDN
    }
}
