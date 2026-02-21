import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { validateSendMessagePayload } from '@/lib/validation';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    if (!validateSendMessagePayload(body)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payload. Required: to (phone 10-15 digits), message (max 1600 chars)'
        },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppMessage(body.to, body.message);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          messageId: result.messageId
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error
      },
      { status: 500 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
