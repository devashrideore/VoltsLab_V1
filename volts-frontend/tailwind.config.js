/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0813',
        surface: '#161224',
        'neon-violet': '#9D4EDD',
        'deep-purple': '#7B2CBF',
        'cyber-cyan': '#00F5FF',
      },
      boxShadow: {
        glow: '0 0 20px rgba(157, 78, 221, 0.45)',
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.35)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
