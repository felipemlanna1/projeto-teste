/**
 * @jest-environment node
 */
import { POST } from '../route';

jest.mock('@/lib/whatsapp');
jest.mock('@/lib/validation');

import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { validateSendMessagePayload } from '@/lib/validation';

const mockSendWhatsAppMessage = sendWhatsAppMessage as jest.MockedFunction<typeof sendWhatsAppMessage>;
const mockValidateSendMessagePayload = validateSendMessagePayload as jest.MockedFunction<typeof validateSendMessagePayload>;

function createRequest(body: unknown): Request {
  return new Request('http://localhost/api/whatsapp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

describe('POST /api/whatsapp/send', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if payload is invalid', async () => {
    mockValidateSendMessagePayload.mockReturnValue(false);

    const request = createRequest({ to: '123', message: '' });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Invalid payload');
  });

  it('returns 200 with messageId if success', async () => {
    mockValidateSendMessagePayload.mockReturnValue(true);
    mockSendWhatsAppMessage.mockResolvedValue({
      success: true,
      messageId: 'SM123'
    });

    const request = createRequest({
      to: '5511999999999',
      message: 'Test message'
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.messageId).toBe('SM123');
  });

  it('returns 500 if sendWhatsAppMessage returns success false', async () => {
    mockValidateSendMessagePayload.mockReturnValue(true);
    mockSendWhatsAppMessage.mockResolvedValue({
      success: false,
      error: 'Twilio API error'
    });

    const request = createRequest({
      to: '5511999999999',
      message: 'Test message'
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Twilio API error');
  });

  it('returns 500 if request.json() fails', async () => {
    const request = new Request('http://localhost/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json'
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });
});
