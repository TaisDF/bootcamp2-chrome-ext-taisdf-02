// Em playwright.config.ts
import { defineConfig, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
// Ajuste '..' se o config estiver na raiz ou '.' se estiver em /tests
const __dirname = path.dirname(__filename); 

// Caminho para a pasta 'dist'
const dist = path.join(__dirname, '..', 'dist');

export default defineConfig({
  testDir: './tests', // Se o config estiver na raiz
  // testDir: '.',    // Se o config estiver dentro de /tests
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
  ],
  
  use: {
    // headless: true, // Mude para true para o CI
    headless: false, // Bom para ver o teste rodando localmente
  },

  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            `--disable-extensions-except=${dist}`,
            `--load-extension=${dist}`,
          ],
        },
      },
    },
  ],
});