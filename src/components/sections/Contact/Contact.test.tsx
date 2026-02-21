import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './index'

const mockFetch = jest.fn()

function makeOkResponse(body: object) {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  })
}

function makeErrorResponse(status = 500, body: object = { success: false }) {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve(body),
  })
}

beforeEach(() => {
  global.fetch = mockFetch
  mockFetch.mockReset()
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Contact form', () => {
  describe('rendering', () => {
    it('renders the name field', () => {
      render(<Contact />)
      expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument()
    })

    it('renders the email field', () => {
      render(<Contact />)
      expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument()
    })

    it('renders the message field', () => {
      render(<Contact />)
      expect(screen.getByRole('textbox', { name: /mensagem/i })).toBeInTheDocument()
    })

    it('renders the submit button', () => {
      render(<Contact />)
      expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument()
    })

    it('renders the WhatsApp link alternative', () => {
      render(<Contact />)
      expect(screen.getByRole('link', { name: /falar no whatsapp/i })).toBeInTheDocument()
    })
  })

  describe('validation errors on submit with empty fields', () => {
    it('shows name required error when name is empty', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
      })
    })

    it('shows email required error when email is empty', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument()
      })
    })

    it('shows message required error when message is empty', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument()
      })
    })
  })

  describe('email validation error', () => {
    it('shows invalid email error for bad email format', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'João')
      await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'not-an-email')
      await user.type(screen.getByRole('textbox', { name: /mensagem/i }), 'Olá')

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/informe um e-mail válido/i)).toBeInTheDocument()
      })
    })
  })

  describe('loading state', () => {
    it('shows loading state while submitting', async () => {
      const user = userEvent.setup()

      type FakeResponse = { ok: boolean; status: number; json: () => Promise<object> }
      let resolvePromise!: (value: FakeResponse) => void
      mockFetch.mockReturnValue(
        new Promise<FakeResponse>((resolve) => {
          resolvePromise = resolve
        })
      )

      render(<Contact />)

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'João')
      await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'joao@example.com')
      await user.type(screen.getByRole('textbox', { name: /mensagem/i }), 'Olá')

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/enviando/i)).toBeInTheDocument()
      })

      resolvePromise({ ok: true, status: 200, json: () => Promise.resolve({ success: true }) })
    })
  })

  describe('success state', () => {
    it('shows success message after successful submit', async () => {
      const user = userEvent.setup()

      mockFetch.mockResolvedValueOnce(makeOkResponse({ success: true }))

      render(<Contact />)

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'João')
      await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'joao@example.com')
      await user.type(screen.getByRole('textbox', { name: /mensagem/i }), 'Olá')

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(
          screen.getByText(/mensagem enviada com sucesso/i)
        ).toBeInTheDocument()
      })
    })

    it('clears the form after successful submit', async () => {
      const user = userEvent.setup()

      mockFetch.mockResolvedValueOnce(makeOkResponse({ success: true }))

      render(<Contact />)

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'João')
      await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'joao@example.com')
      await user.type(screen.getByRole('textbox', { name: /mensagem/i }), 'Olá')

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument()
      })

      const resendButton = screen.getByRole('button', { name: /enviar nova mensagem/i })
      expect(resendButton).toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('shows error message after failed HTTP response', async () => {
      const user = userEvent.setup()

      mockFetch.mockResolvedValueOnce(makeErrorResponse(500))

      render(<Contact />)

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'João')
      await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'joao@example.com')
      await user.type(screen.getByRole('textbox', { name: /mensagem/i }), 'Olá')

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/ocorreu um erro/i)).toBeInTheDocument()
      })
    })

    it('shows network error message when fetch throws', async () => {
      const user = userEvent.setup()

      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<Contact />)

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'João')
      await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'joao@example.com')
      await user.type(screen.getByRole('textbox', { name: /mensagem/i }), 'Olá')

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/erro de conexão/i)).toBeInTheDocument()
      })
    })
  })

  describe('validation clears on typing', () => {
    it('clears name error when user starts typing in name field', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

      await waitFor(() => {
        expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
      })

      await user.type(screen.getByRole('textbox', { name: /nome/i }), 'J')

      await waitFor(() => {
        expect(screen.queryByText(/nome é obrigatório/i)).not.toBeInTheDocument()
      })
    })
  })
})
