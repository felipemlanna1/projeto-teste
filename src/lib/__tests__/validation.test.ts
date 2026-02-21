import { validateSendMessagePayload } from '../validation';

describe('validateSendMessagePayload', () => {
  it('returns true for valid payload with to and message', () => {
    const validPayload = {
      to: '5511999999999',
      message: 'Hello, this is a test message'
    };

    expect(validateSendMessagePayload(validPayload)).toBe(true);
  });

  it('returns false for payload without to', () => {
    const invalidPayload = {
      message: 'Hello, this is a test message'
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns false for payload without message', () => {
    const invalidPayload = {
      to: '5511999999999'
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns false for to with less than 10 digits', () => {
    const invalidPayload = {
      to: '123456789',
      message: 'Hello'
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns false for to with more than 15 digits', () => {
    const invalidPayload = {
      to: '1234567890123456',
      message: 'Hello'
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns false for to with less than 10 numeric digits even with non-numeric chars', () => {
    const invalidPayload = {
      to: '123abc456',
      message: 'Hello'
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns false for empty message', () => {
    const invalidPayload = {
      to: '5511999999999',
      message: ''
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns false for message with more than 1600 chars', () => {
    const invalidPayload = {
      to: '5511999999999',
      message: 'a'.repeat(1601)
    };

    expect(validateSendMessagePayload(invalidPayload)).toBe(false);
  });

  it('returns true for payload with optional templateName', () => {
    const validPayload = {
      to: '5511999999999',
      message: 'Hello, this is a test message',
      templateName: 'welcome_template'
    };

    expect(validateSendMessagePayload(validPayload)).toBe(true);
  });
});
