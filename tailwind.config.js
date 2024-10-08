// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 100%)', // Definindo a cor para `bg-background`
        foreground: 'hsl(0, 0%, 3.9%)', // Definindo a cor para `text-foreground`
        // Adicione outras cores personalizadas, se necessário
      },
    },
  },
  plugins: [],
};