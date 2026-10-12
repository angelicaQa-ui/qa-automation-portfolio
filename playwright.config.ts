import { defineConfig, devices } from '@playwright/test';

/**
 * Ver https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Ejecutar las pruebas en archivos en paralelo */
  fullyParallel: true,
  /* Falla la compilación en CI si accidentalmente dejaste test.only en el código fuente */
  forbidOnly: !!process.env.CI,
  /* Reintentar solo en CI */
  retries: process.env.CI ? 2 : 0,
  /* Desactivar pruebas en paralelo en CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reportador a utilizar. Ver https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Configuración compartida para todos los proyectos a continuación. Ver https://playwright.dev/docs/api/class-testoptions */
  use: {
    /* URL base a utilizar en acciones como `await page.goto('/')` */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    /* Recopilar traza cuando se reintente una prueba fallida. Ver https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configurar proyectos para los navegadores principales */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});