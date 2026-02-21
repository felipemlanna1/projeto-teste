import { NextRequest, NextResponse } from 'next/server'
import { ContactFormData } from '@/types/contact'
import { isValidEmail } from '@/lib/utils'

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }

  const data = body as Partial<ContactFormData>

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: 'Name is required' },
      { status: 422 }
    )
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email.trim())) {
    return NextResponse.json(
      { success: false, error: 'Valid email is required' },
      { status: 422 }
    )
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: 'Message is required' },
      { status: 422 }
    )
  }

  // Future integration: persist lead to CRM or database here
  return NextResponse.json({ success: true }, { status: 200 })
}
