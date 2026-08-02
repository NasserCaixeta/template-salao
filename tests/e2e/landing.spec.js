import { expect, test } from '@playwright/test'

test('preserves the cinematic sequence and persistent header', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero')).toBeVisible()
  await expect(page.locator('.hero__scene').first()).toHaveCSS('object-fit', 'cover')
  await page.locator('#servicos').scrollIntoViewIfNeeded()
  await expect(page.locator('.site-header')).toBeVisible()
  await expect(page.getByTestId('service-card')).toHaveCount(4)
  await expect(page.locator('.service-card video')).toHaveCount(1)
  await expect(page.getByTestId('service-card').nth(1).locator('video')).toHaveAttribute('poster', '/media/service-shine-poster.jpg')
  await page.locator('#metodo').scrollIntoViewIfNeeded()
  await expect(page.getByTestId('method-card')).toHaveCount(3)
})

test('menu opens, closes with Escape, and exposes only approved navigation', async ({ page }) => {
  await page.goto('/')
  const menuButton = page.getByRole('button', { name: 'Abrir menu' })
  if (await menuButton.isVisible()) {
    await menuButton.click()
    await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused()
  } else {
    await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible()
  }
  await expect(page.getByLabel(/som/i)).toHaveCount(0)
})

test('reduced motion keeps all content available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByTestId('service-card')).toHaveCount(4)
  await expect(page.locator('.service-card video')).toHaveCount(0)
  await expect(page.getByAltText('Cabelo loiro longo e brilhante sendo exibido dentro do salão')).toHaveAttribute('src', '/media/service-shine-poster.jpg')
  await expect(page.getByTestId('method-card')).toHaveCount(3)
  await expect(page.getByRole('link', { name: /agendar pelo whatsapp/i })).toBeVisible()
})
