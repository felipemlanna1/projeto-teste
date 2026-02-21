import type { SendMessageRequest } from '@/types/whatsapp';

export function validateSendMessagePayload(body: unknown): body is SendMessageRequest {
  if (!body || typeof body !== 'object') {
    return false;
  }

  const payload = body as Record<string, unknown>;

  if (typeof payload.to !== 'string' || payload.to.trim().length === 0) {
    return false;
  }

  const phoneDigits = payload.to.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return false;
  }

  if (typeof payload.message !== 'string' || payload.message.trim().length === 0) {
    return false;
  }

  if (payload.message.length > 1600) {
    return false;
  }

  if (payload.templateName !== undefined && typeof payload.templateName !== 'string') {
    return false;
  }

  return true;
}
