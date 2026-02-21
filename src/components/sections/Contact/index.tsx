"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { generateWhatsAppLink } from '@/lib/whatsapp'
import { isValidEmail } from '@/lib/utils'
import { ContactFormData, ContactFormState } from '@/types/contact'

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '5511999999999'

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [formState, setFormState] = useState<ContactFormState>({ status: 'idle' })

  function validate(): boolean {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Informe um e-mail válido'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validate()) return

    setFormState({ status: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      if (response.ok) {
        setFormState({
          status: 'success',
          message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.',
        })
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
      } else {
        setFormState({
          status: 'error',
          message: 'Ocorreu um erro. Por favor, tente novamente.',
        })
      }
    } catch {
      setFormState({
        status: 'error',
        message: 'Ocorreu um erro de conexão. Por favor, tente novamente.',
      })
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const whatsappMessage = `Olá! Me chamo ${formData.name || 'visitante'} e gostaria de conversar sobre o produto.`
  const whatsappHref = generateWhatsAppLink(WHATSAPP_PHONE, whatsappMessage)

  const isLoading = formState.status === 'loading'

  return (
    <section
      id="contato"
      className="w-full bg-zinc-50 px-4 py-16 md:px-8 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <h2
              id="contact-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 lg:text-5xl"
            >
              Fale com a gente
            </h2>
            <p className="max-w-md text-base leading-relaxed text-zinc-600 lg:text-lg">
              Tem alguma dúvida ou quer saber como podemos ajudar o seu negócio?
              Envie uma mensagem ou nos chame no WhatsApp.
            </p>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                Resposta em até 1 hora durante horário comercial
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                Suporte em português
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                Demonstração gratuita disponível
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-8">
            {formState.status === 'success' ? (
              <div
                role="alert"
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base font-medium text-zinc-900">{formState.message}</p>
                <Button
                  variant="outline"
                  onClick={() => setFormState({ status: 'idle' })}
                >
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Como podemos ajudar você?"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={errors.message ? 'border-red-500 focus:ring-red-500' : ''}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {formState.status === 'error' && (
                  <p role="alert" className="text-xs text-red-600">
                    {formState.message}
                  </p>
                )}

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                    size="lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando…
                      </span>
                    ) : (
                      'Enviar Mensagem'
                    )}
                  </Button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#25D366] px-8 py-3 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Falar no WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
