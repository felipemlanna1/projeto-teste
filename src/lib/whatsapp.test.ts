import { generateWhatsAppLink } from './whatsapp'

describe('generateWhatsAppLink()', () => {
  it('generates a URL with the wa.me base', () => {
    const link = generateWhatsAppLink('5511999999999', 'Hello')
    expect(link).toMatch(/^https:\/\/wa\.me\//)
  })

  it('embeds the phone number in the URL path', () => {
    const link = generateWhatsAppLink('5511999999999', 'Hello')
    expect(link).toContain('5511999999999')
  })

  it('includes a text query parameter', () => {
    const link = generateWhatsAppLink('5511999999999', 'Hello')
    expect(link).toContain('?text=')
  })

  it('URL-encodes the message', () => {
    const link = generateWhatsAppLink('5511999999999', 'Hello World')
    expect(link).toContain('Hello%20World')
  })

  it('URL-encodes special characters in the message', () => {
    const link = generateWhatsAppLink('5511999999999', 'Olá! Tudo bem?')
    expect(link).toContain(encodeURIComponent('Olá! Tudo bem?'))
  })

  it('URL-encodes ampersands and equals signs in the message', () => {
    const message = 'A=1&B=2'
    const link = generateWhatsAppLink('5511999999999', message)
    expect(link).toContain(encodeURIComponent(message))
    expect(link).not.toContain('A=1&B=2')
  })

  it('produces the expected full URL for a basic case', () => {
    const link = generateWhatsAppLink('5511999999999', 'Hi')
    expect(link).toBe('https://wa.me/5511999999999?text=Hi')
  })

  it('handles an empty message without throwing', () => {
    const link = generateWhatsAppLink('5511999999999', '')
    expect(link).toBe('https://wa.me/5511999999999?text=')
  })

  it('handles country codes other than Brazil', () => {
    const link = generateWhatsAppLink('14155551234', 'Hello')
    expect(link).toContain('14155551234')
  })
})
