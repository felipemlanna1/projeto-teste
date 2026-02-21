import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('#contato').scrollIntoViewIfNeeded()
  })

  test('renders contact section with heading and all form fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /fale com a gente/i })).toBeVisible()
    await expect(page.getByLabel('Nome')).toBeVisible()
    await expect(page.getByLabel('E-mail')).toBeVisible()
    await expect(page.getByLabel('Mensagem')).toBeVisible()
  })

  test('form validation shows errors for empty required fields on submit', async ({ page }) => {
    await page.getByRole('button', { name: /enviar mensagem/i }).click()
    await expect(page.getByText('Nome é obrigatório')).toBeVisible()
    await expect(page.getByText('E-mail é obrigatório')).toBeVisible()
    await expect(page.getByText('Mensagem é obrigatória')).toBeVisible()
  })

  test('email format validation shows error for invalid email', async ({ page }) => {
    await page.getByLabel('Nome').fill('Maria Oliveira')
    await page.getByLabel('E-mail').fill('email-invalido')
    await page.getByLabel('Mensagem').fill('Gostaria de uma demonstração')
    await page.getByRole('button', { name: /enviar mensagem/i }).click()
    await expect(page.getByText('Informe um e-mail válido')).toBeVisible()
    await expect(page.getByText('Nome é obrigatório')).not.toBeVisible()
    await expect(page.getByText('Mensagem é obrigatória')).not.toBeVisible()
  })

  test('form shows loading state when submitted with valid data', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.getByLabel('Nome').fill('João Silva')
    await page.getByLabel('E-mail').fill('joao@exemplo.com.br')
    await page.getByLabel('Mensagem').fill('Quero agendar uma demonstração do produto.')

    await page.getByRole('button', { name: /enviar mensagem/i }).click()

    await expect(page.getByText('Enviando')).toBeVisible()
    const submitBtn = page.getByRole('button', { name: /enviando/i })
    await expect(submitBtn).toBeDisabled()
  })

  test('keyboard navigation works through form fields', async ({ page }) => {
    const nameInput = page.getByLabel('Nome')
    await nameInput.focus()
    await expect(nameInput).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByLabel('E-mail')).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Mensagem')).toBeFocused()

    await page.keyboard.press('Tab')
    const submitButton = page.getByRole('button', { name: /enviar mensagem/i })
    await expect(submitButton).toBeFocused()
  })

  test('pressing Enter in form triggers submit and shows validation errors', async ({ page }) => {
    const nameInput = page.getByLabel('Nome')
    await nameInput.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByText('Nome é obrigatório')).toBeVisible()
  })
})

test.describe('WhatsApp Floating Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders with correct aria-label', async ({ page }) => {
    const whatsappBtn = page.getByRole('link', { name: /falar no whatsapp/i }).first()
    await expect(whatsappBtn).toBeVisible()
  })

  test('has href containing wa.me', async ({ page }) => {
    const whatsappBtn = page.getByRole('link', { name: 'Falar no WhatsApp' }).first()
    const href = await whatsappBtn.getAttribute('href')
    expect(href).toContain('wa.me')
  })
})

test.describe('Responsive Layout', () => {
  test('mobile viewport (375px) — contact section and form fields visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.locator('#contato').scrollIntoViewIfNeeded()

    await expect(page.getByRole('heading', { name: /fale com a gente/i })).toBeVisible()
    await expect(page.getByLabel('Nome')).toBeVisible()
    await expect(page.getByLabel('E-mail')).toBeVisible()
    await expect(page.getByLabel('Mensagem')).toBeVisible()

    const whatsappBtn = page.getByRole('link', { name: 'Falar no WhatsApp' }).first()
    await expect(whatsappBtn).toBeVisible()
  })

  test('desktop viewport (1280px) — two-column contact layout visible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.locator('#contato').scrollIntoViewIfNeeded()

    await expect(page.getByRole('heading', { name: /fale com a gente/i })).toBeVisible()

    const contactSection = page.locator('#contato')
    const gridContainer = contactSection.locator('.grid')
    await expect(gridContainer).toBeVisible()

    await expect(page.getByLabel('Nome')).toBeVisible()
    await expect(page.getByLabel('E-mail')).toBeVisible()
    await expect(page.getByLabel('Mensagem')).toBeVisible()
  })
})
