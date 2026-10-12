import { test, expect } from '@playwright/test';

test.describe('Flujo E2E de SauceDemo - Reto Final', () => {

  test('Happy Path: Compra exitosa de producto @smoke @regression', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Validación de datos: Verificar que entramos al inventario
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');

    // 2. Acción principal: Agregar producto al carrito
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');

    // Validación del carrito
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    // 3. Checkout
    await page.click('#checkout');
    await page.fill('#first-name', 'Maria');
    await page.fill('#last-name', 'Perez');
    await page.fill('#postal-code', '110111');
    await page.click('#continue');

    await page.click('#finish');

    // Validación de mensajes de éxito
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // 4. Logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Caso Negativo 1: Usuario bloqueado muestra mensaje de error @regression', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Validación de mensajes de error esperados
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Caso Negativo 2: Campos de login vacíos @regression', async ({ page }) => {
    await page.goto('/');
    await page.click('#login-button');

    // Validación de error por campos vacíos
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });

});