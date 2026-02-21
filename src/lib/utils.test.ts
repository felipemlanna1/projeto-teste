import { cn, isValidEmail } from './utils'

describe('cn()', () => {
  it('returns a single class name unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('merges multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles undefined and falsy values without throwing', () => {
    expect(cn('foo', undefined, false, null as unknown as string)).toBe('foo')
  })

  it('deduplicates and overrides conflicting Tailwind classes', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500')
  })

  it('preserves non-conflicting classes when merging', () => {
    const result = cn('text-sm', 'font-bold', 'text-lg')
    expect(result).toBe('font-bold text-lg')
  })

  it('handles empty string input', () => {
    expect(cn('')).toBe('')
  })

  it('handles no arguments', () => {
    expect(cn()).toBe('')
  })

  it('merges conditional classes via array', () => {
    const isActive = true
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base active')
  })
})

describe('isValidEmail()', () => {
  it('accepts a standard valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })

  it('accepts email with subdomain', () => {
    expect(isValidEmail('user@mail.example.com')).toBe(true)
  })

  it('accepts email with plus sign in local part', () => {
    expect(isValidEmail('user+tag@example.com')).toBe(true)
  })

  it('rejects email missing the @ symbol', () => {
    expect(isValidEmail('userexample.com')).toBe(false)
  })

  it('rejects email missing the domain', () => {
    expect(isValidEmail('user@')).toBe(false)
  })

  it('rejects email missing the local part', () => {
    expect(isValidEmail('@example.com')).toBe(false)
  })

  it('rejects email without TLD', () => {
    expect(isValidEmail('user@example')).toBe(false)
  })

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('rejects email with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false)
  })
})
