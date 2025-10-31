// Unit tests for utility functions
const { validateEmail, calculateTotal } = require('../utils/helpers');

describe('Utility Functions', () => {
  describe('validateEmail', () => {
    test('should validate correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should reject invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });

    test('should handle empty string', () => {
      expect(validateEmail('')).toBe(false);
    });

    test('should reject email without domain', () => {
      expect(validateEmail('test@.com')).toBe(false);
    });

    test('should reject email with spaces', () => {
      expect(validateEmail('test @example.com')).toBe(false);
    });
  });

  describe('calculateTotal', () => {
    test('should calculate total correctly', () => {
      const items = [
        { price: 10 },
        { price: 20 },
        { price: 5 }
      ];
      
      expect(calculateTotal(items)).toBe(35);
    });

    test('should handle empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });

    test('should throw error for invalid input', () => {
      expect(() => calculateTotal('not an array')).toThrow('Items must be an array');
    });

    test('should throw error for negative prices', () => {
      const items = [
        { price: 10 },
        { price: -5 } // Invalid negative price
      ];
      
      expect(() => calculateTotal(items)).toThrow('Invalid price');
    });

    test('should handle single item', () => {
      const items = [{ price: 15.99 }];
      expect(calculateTotal(items)).toBe(15.99);
    });

    test('should handle decimal prices correctly', () => {
      const items = [
        { price: 10.50 },
        { price: 20.25 }
      ];
      expect(calculateTotal(items)).toBeCloseTo(30.75);
    });
  });
});