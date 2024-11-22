import { defineConfig } from "cypress";

const is_prod = process.env.NODE_ENV === 'production';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: is_prod ? 'http://localhost:5173' : 'http://localhost:5173', // Update this to match your development server URL
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});