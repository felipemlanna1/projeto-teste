import twilio from 'twilio';
import type { SendMessageResponse, TwilioConfig } from '@/types/whatsapp';

function getTwilioConfig(): TwilioConfig {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !whatsappNumber) {
    throw new Error('Missing required Twilio environment variables');
  }

  return {
    accountSid,
    authToken,
    whatsappNumber,
  };
}

function formatWhatsAppNumber(phoneNumber: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  if (cleanNumber.startsWith('55')) {
    return `whatsapp:+${cleanNumber}`;
  }

  return `whatsapp:+${cleanNumber}`;
}

export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<SendMessageResponse> {
  try {
    const config = getTwilioConfig();
    const client = twilio(config.accountSid, config.authToken);

    const fromNumber = formatWhatsAppNumber(config.whatsappNumber);
    const toNumber = formatWhatsAppNumber(to);

    const messageResponse = await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber,
    });

    return {
      success: true,
      messageId: messageResponse.sid,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export function generateWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
