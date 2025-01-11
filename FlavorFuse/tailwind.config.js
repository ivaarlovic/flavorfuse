/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridArea: {
        header: "header",
        main: "main",
        footer: "footer",
      },
      
      fontFamily: {
        italianno: ['Roboto'],
        scintilla: ['Scintilla', 'sans-serif'],
    },
  },
},
  plugins: [],
}

