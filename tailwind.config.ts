/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Ativa o modo escuro com a classe 'dark'
  content: [
    './pages/**/*.{ts,tsx}', // Inclui os arquivos nas pastas "pages"
    './components/**/*.{ts,tsx}', // Inclui os arquivos nas pastas "components"
    './app/**/*.{ts,tsx}', // Inclui os arquivos nas pastas "app"
    './src/**/*.{ts,tsx}' // Inclui os arquivos nas pastas "src"
  ],
  theme: {
    container: {
      center: true, // Centraliza os containers
      padding: '2rem', // Define o padding padrão
      screens: {
        '2xl': '1400px' // Define a largura máxima para telas grandes
      }
    },
    extend: {
      colors: {
        // Definindo cores personalizadas com base nas variáveis CSS
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      // Adiciona valores de borda personalizados baseados em variáveis CSS
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Definindo keyframes para animação do acordeão
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      // Adiciona as animações usando os keyframes
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  // Plugins adicionais para suporte a animações e tipografia
  plugins: [
    require('tailwindcss-animate'), // Suporte para animações
    require('@tailwindcss/typography') // Suporte para tipografia avançada
  ]
}
