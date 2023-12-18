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
      'purple-dark': {
        extend: 'dark', // <- inherit default values from dark theme
        colors: {
          background: {
            500: '#232323',
            600: '#1d1d1d',
            700: '#161616',
            DEFAULT: '#232323',
          },
          foreground: {
            500: '#d9d5d5',
            600: '#b1a9a9',
            DEFAULT: '#d9d5d5',
          },
          primary: {
            50: '#fae4e9',
            100: '#f4bcc9',
            200: '#ed92a7',
            300: '#e56a85',
            400: '#dd506d',
            500: '#d73d57',
            600: '#c73854',
            700: '#b23350',
            800: '#9d2e4c',
            900: '#782743',
            DEFAULT: '#b23350',
          },
          secondary: {
            50: '#fefdea',
            100: '#fdf9cc',
            200: '#fcf5ac',
            300: '#faf18d',
            400: '#f8ec75',
            500: '#f5e762',
            600: '#f7da60',
            700: '#f2c357',
            800: '#edae4e',
            900: '#e48a40',
            DEFAULT: '#f5e762',
          },
          gray: {
            50: '#f9f9f9',
            100: '#f2f2f2',
            200: '#e8e8e8',
            300: '#d8d8d8',
            400: '#b4b4b4',
            500: '#949494',
            600: '#6c6c6c',
            700: '#595959',
            800: '#3a3a3a',
            900: '#1a1a1a',
          },
        },
        layout: {
          disabledOpacity: '0.3',
          radius: {
            small: '4px',
            medium: '6px',
            large: '8px',
          },
          borderWidth: {
            small: '1px',
            medium: '2px',
            large: '3px',
          },
        },
      },
    },
  })],
}
