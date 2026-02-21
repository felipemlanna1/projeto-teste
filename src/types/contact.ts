export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}
