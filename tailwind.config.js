//** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#0F1035',  // Exemplo de cor já adicionada
        'enviado-gray': '#A0AEC0',      // Cor personalizada para 'enviado'
        'recusado-red': '#F56565',      // Cor personalizada para 'recusado'
        'aprovado-green': '#48BB78',    // Cor personalizada para 'aprovado'
        'em-analise-yellow': '#ECC94B'  // Cor personalizada para 'em análise'
      },
    },
  },
  plugins: [],
}
