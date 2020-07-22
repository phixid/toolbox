import { NumberValidator } from './number-validator';

describe('NumberValidator', () => {
  const validator = new NumberValidator();

  describe('validate', () => {
    test('false when passing string', () => {
      expect(validator.validate('')).toEqual(false);
      expect(validator.validate('test')).toEqual(false);
    });

    test('false when passing non-primitive values', () => {
      expect(validator.validate([])).toEqual(false);
      expect(validator.validate({})).toEqual(false);
      expect(validator.validate(null)).toEqual(false);
      expect(validator.validate(undefined)).toEqual(false);
    });

    test('true when passing boolean', () => {
      expect(validator.validate(false)).toEqual(false);
      expect(validator.validate(true)).toEqual(false);
    });

    test('true when passing numbers', () => {
      expect(validator.validate(0)).toEqual(true);
      expect(validator.validate(1)).toEqual(true);
    });
  });
});
