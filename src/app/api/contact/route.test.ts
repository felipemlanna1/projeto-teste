/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { POST } from './route'

function makeRequest(body: unknown, invalidJson = false): NextRequest {
  if (invalidJson) {
    return new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-valid-json{{{',
    })
  }

  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  it('returns 200 with success:true for valid data', async () => {
    const req = makeRequest({ name: 'João', email: 'joao@example.com', message: 'Olá' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('returns 422 when name is missing', async () => {
    const req = makeRequest({ email: 'joao@example.com', message: 'Olá' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(422)
    expect(data.success).toBe(false)
    expect(data.error).toBeTruthy()
  })

  it('returns 422 when name is an empty string', async () => {
    const req = makeRequest({ name: '   ', email: 'joao@example.com', message: 'Olá' })
    const res = await POST(req)

    expect(res.status).toBe(422)
  })

  it('returns 422 when email is missing', async () => {
    const req = makeRequest({ name: 'João', message: 'Olá' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(422)
    expect(data.success).toBe(false)
  })

  it('returns 422 when email is invalid', async () => {
    const req = makeRequest({ name: 'João', email: 'not-an-email', message: 'Olá' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(422)
    expect(data.success).toBe(false)
  })

  it('returns 422 when message is missing', async () => {
    const req = makeRequest({ name: 'João', email: 'joao@example.com' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(422)
    expect(data.success).toBe(false)
  })

  it('returns 422 when message is an empty string', async () => {
    const req = makeRequest({ name: 'João', email: 'joao@example.com', message: '   ' })
    const res = await POST(req)

    expect(res.status).toBe(422)
  })

  it('returns 400 when body is invalid JSON', async () => {
    const req = makeRequest(null, true)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('includes an error field in the response on failure', async () => {
    const req = makeRequest({ name: 'João', email: 'joao@example.com' })
    const res = await POST(req)
    const data = await res.json()

    expect(data).toHaveProperty('error')
  })
})
