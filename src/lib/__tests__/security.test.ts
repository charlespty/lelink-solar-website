import {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  validateContactForm,
  validateQuoteForm,
  checkRateLimit,
} from '@/lib/security'

describe('Security Utils', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
    })

    it('removes javascript protocol', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")')
    })

    it('removes event handlers', () => {
      expect(sanitizeInput('onclick="alert(1)"')).toBe('"alert(1)"')
    })

    it('trims whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test')
    })
  })

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.org')).toBe(true)
    })

    it('rejects invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('isValidPhone', () => {
    it('validates correct phone formats', () => {
      expect(isValidPhone('+1234567890')).toBe(true)
      expect(isValidPhone('1234567890')).toBe(true)
      expect(isValidPhone('+86 13961616296')).toBe(true)
    })

    it('rejects invalid phone formats', () => {
      expect(isValidPhone('123')).toBe(false)
      expect(isValidPhone('abc123')).toBe(false)
      expect(isValidPhone('')).toBe(false)
    })
  })

  describe('validateContactForm', () => {
    it('validates correct form data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with sufficient length',
      }
      const result = validateContactForm(validData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects invalid form data', () => {
      const invalidData = {
        name: 'A', // Too short
        email: 'invalid-email',
        message: 'Short', // Too short
      }
      const result = validateContactForm(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('validateQuoteForm', () => {
    it('validates correct quote form data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        product: 'LE Solar Generator',
        quantity: '2',
      }
      const result = validateQuoteForm(validData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects invalid quote form data', () => {
      const invalidData = {
        name: 'A', // Too short
        email: 'invalid-email',
        product: '', // Missing product
        quantity: 'invalid', // Invalid quantity
      }
      const result = validateQuoteForm(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('checkRateLimit', () => {
    it('allows requests within limit', () => {
      const identifier = 'test-user-1'
      expect(checkRateLimit(identifier, 5, 60000)).toBe(true)
      expect(checkRateLimit(identifier, 5, 60000)).toBe(true)
    })

    it('blocks requests exceeding limit', () => {
      const identifier = 'test-user-2'
      // Make 5 requests (limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier, 5, 60000)
      }
      // 6th request should be blocked
      expect(checkRateLimit(identifier, 5, 60000)).toBe(false)
    })
  })
})
