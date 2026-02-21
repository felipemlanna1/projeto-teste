/**
 * @jest-environment node
 */
import { sendWhatsAppMessage } from '../whatsapp';

jest.mock('twilio', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({ sid: 'SM123', status: 'queued' })
    }
  }));
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const twilio = jest.mocked(require('twilio'));

describe('sendWhatsAppMessage', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      TWILIO_ACCOUNT_SID: 'AC123',
      TWILIO_AUTH_TOKEN: 'token123',
      TWILIO_WHATSAPP_NUMBER: '+14155238886'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('returns success true and messageId on success', async () => {
    const result = await sendWhatsAppMessage('5511999999999', 'Test message');

    expect(result.success).toBe(true);
    expect(result.messageId).toBe('SM123');
  });

  it('returns success false and error when Twilio fails', async () => {
    twilio.mockImplementationOnce(() => ({
      messages: {
        create: jest.fn().mockRejectedValue(new Error('Twilio API error'))
      }
    }));

    const result = await sendWhatsAppMessage('5511999999999', 'Test message');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Twilio API error');
  });

  it('formats number correctly with whatsapp prefix', async () => {
    const mockCreate = jest.fn().mockResolvedValue({ sid: 'SM123', status: 'queued' });

    twilio.mockImplementationOnce(() => ({
      messages: {
        create: mockCreate
      }
    }));

    await sendWhatsAppMessage('5511999999999', 'Test message');

    expect(mockCreate).toHaveBeenCalledWith({
      body: 'Test message',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+5511999999999'
    });
  });

  it('uses environment variables correctly', async () => {
    await sendWhatsAppMessage('5511999999999', 'Test message');

    expect(twilio).toHaveBeenCalledWith('AC123', 'token123');
  });
});
