/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apia: {
          dark: '#1E4633',       // Verde Floresta / Escuro Institucional
          darker: '#163526',     // Variação profunda
          cardDark: '#224233',   // Verde escuro dos cards e botões secundários
          light: '#EBF2EC',      // Verde Claro / Suave de fundo das seções
          lightAlt: '#EDF4EE',   // Variação suave
          bg: '#F9FBF9',         // Fundo Geral Off-white / Creme suave
          orange: '#DE5A3A',     // Laranja / Terracota Acolhedor principal
          orangeHover: '#C84E30',// Hover terracota
          text: '#2D3748',       // Cinza escuro grafite
          textMuted: '#64748B',  // Cinza intermediário
          border: '#D1E0D7',     // Bordas suaves
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(30, 70, 51, 0.08)',
        card: '0 2px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
