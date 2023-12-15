/* eslint-disable import/no-anonymous-default-export */
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      dark: {
        // These plugin doesn't allow to specify custom properties for theme overrides, so the only way is to inline the values.
        // We can consider to use some *.css.ts preprocessors (like vanilla-extract) to be able to import css values here.
        // Or, just get rid of TW in the near future.
        colors: {
          // These values are `--color-text-*` from globals.scss
          foreground: {
            50: 'hsl(0, 0%, 98%)',
            100: 'hsl(240, 5%, 96%)',
            200: 'hsl(240, 6%, 90%)',
            300: 'hsl(240, 5%, 84%)',
            400: 'hsl(240, 5%, 75%)',
            500: 'hsl(240, 5%, 65%)',
            600: 'hsl(240, 4%, 55%)',
            700: 'hsl(240, 4%, 46%)',
            800: 'hsl(240, 5%, 34%)',
            900: 'hsl(240, 5%, 26%)',
            DEFAULT: 'hsl(240, 5%, 65%)',
          },
          // These values are `--color-dark-*` from globals.scss
          default: {
            50: 'hsl(210, 2%, 58%)',
            100: 'hsl(200, 1%, 42%)',
            200: 'hsl(195, 2%, 35%)',
            300: 'hsl(200, 3%, 23%)',
            400: 'hsl(200, 3%, 13%)',
            500: 'hsl(200, 6%, 10%)',
            600: 'hsl(210, 5%, 9%)',
            700: 'hsl(210, 6%, 7%)',
            800: 'hsl(210, 8%, 5%)',
            900: 'hsl(180, 8%, 3%)',
            DEFAULT: 'hsl(200, 6%, 10%)',
          },
          // These values are `--color-primary-*` from globals.scss
          primary: {
            50: 'hsl(226, 100%, 97%)',
            100: 'hsl(226, 100%, 94%)',
            200: 'hsl(228, 96%, 89%)',
            300: 'hsl(230, 94%, 82%)',
            400: 'hsl(234, 89%, 74%)',
            500: 'hsl(239, 84%, 67%)',
            550: 'hsl(212, 100%, 47%)',
            600: 'hsl(243, 75%, 59%)',
            700: 'hsl(245, 58%, 51%)',
            750: 'hsl(245, 61%, 44%)',
            800: 'hsl(244, 55%, 41%)',
            900: 'hsl(242, 47%, 34%)',
            DEFAULT: 'hsl(239, 84%, 67%)',
          },
        },
      },
    },
  })],
}
