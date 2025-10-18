// Em tests/extension.spec.ts
import { test, expect } from '@playwright/test';

test.describe('LexiFocus Chrome Extension', () => {

  // Pedimos 'page' e 'context' da configuração do Playwright
  test('Abre o popup e alterna o tema', async ({ page, context }) => {

    let serviceWorker;
    try {
      // 1. Espera ativamente pelo evento de registro do Service Worker
      serviceWorker = await context.waitForEvent('serviceworker', {
        predicate: (sw) => sw.url().includes('src/background/service-worker.js'),
        timeout: 10000 // 10 segundos de espera
      });
    } catch (error) {
      // Se falhar aqui, o build ou o manifest.json estão com problemas.
      throw new Error('Timeout esperando pelo Service Worker. O worker falhou ao registrar?');
    }

    // 2. Continua com a lógica do teste
    const extensionId = serviceWorker.url().split('/')[2];
    const popupUrl = `chrome-extension://${extensionId}/src/popup/popup.html`;
    
    // 3. Navega para a página do popup
    await page.goto(popupUrl);
    
    // 4. Valida o título
    await expect(page.locator('h1')).toHaveText('LexiFocus');

    // 5. Valida a troca de tema
    const themeButton = page.locator('.theme-toggle');
    const themeImg = page.locator('.theme-toggle img');
    
    const oldSrc = await themeImg.getAttribute('src');
    await themeButton.click();
    const newSrc = await themeImg.getAttribute('src');
    
    // Verifica se a imagem do botão mudou
    expect(newSrc).not.toBe(oldSrc); 

    // 6. Valida a troca de fonte
    await page.locator('#lexend-btn').click();
    await page.locator('#atkinson-btn').click();

    // 7. O teste termina com sucesso se chegou até aqui
  });
});