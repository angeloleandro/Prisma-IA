// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Adicionando o suporte a modo escuro da Vercel
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{ts,tsx}', // Mantém os caminhos existentes e inclui o 'src' do Vercel
  ],
  theme: {
    container: {
      center: true, // Adicionando centralização automática de containers
      padding: '2rem',
      screens: {
        '2xl': '1400px', // Adiciona a configuração de breakpoints personalizada da Vercel
      },
    },
    extend: {
      colors: {
        // Cores personalizadas do projeto local
        background: 'hsl(0, 0%, 100%)', // 'bg-background' do arquivo local
        foreground: 'hsl(0, 0%, 3.9%)', // 'text-foreground' do arquivo local

        // Cores do Vercel (com variáveis CSS para maior flexibilidade)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        // Configurações de borda do Vercel
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        // Animações do Vercel
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        // Configurações de animação do Vercel
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Plugin de animação do Vercel
    require('@tailwindcss/typography'), // Plugin de tipografia do Vercel
    // Você pode adicionar outros plugins locais, se necessário
  ],
};