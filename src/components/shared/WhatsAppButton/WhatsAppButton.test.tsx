import { render, screen } from '@testing-library/react'
import WhatsAppButton from './index'

describe('WhatsAppButton', () => {
  it('renders an anchor element', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link).toBeInTheDocument()
  })

  it('has aria-label "Falar no WhatsApp"', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link).toHaveAttribute('aria-label', 'Falar no WhatsApp')
  })

  it('href contains wa.me', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('opens in a new tab via target="_blank"', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('has rel="noopener noreferrer" for security', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has fixed positioning class', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link.className).toContain('fixed')
  })

  it('has the WhatsApp brand background color class', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(link.className).toContain('bg-[#25D366]')
  })

  it('href contains the phone number', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /falar no whatsapp/i })
    const href = link.getAttribute('href') ?? ''
    expect(href).toMatch(/wa\.me\/\d+/)
  })
})
