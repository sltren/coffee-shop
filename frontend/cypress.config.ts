import { defineConfig } from 'cypress';
import { setupNodeEvents } from './cypress/plugins/index';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents,
    specPattern: 'cypress/e2e/**/*.spec.ts',
    supportFile: false,
  },
});