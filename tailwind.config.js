/** @type {import('tailwindcss').Config} */

const { createThemes } = require("tw-colors");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      principal: {
        "primary-color": "#0C5489",
        "primary-color-2": "#50A1EA",
        "primary-color-3": "#0F3675",
        "secondary-color": "#A57A45",
        "secondary-color-2": "#c9af8f",
        "secondary-color-3": "#634929",
        "c-success": "#57C73C",
        "c-warn": "#E2D55B",
        "c-error": "#FF412E",
        "c-info": "#0B65BD",

        "gray-1": "#d1d5db",
        "gray-2": "#6b7280",
        "gray-3": "#374151",
      },})
  ],
}
