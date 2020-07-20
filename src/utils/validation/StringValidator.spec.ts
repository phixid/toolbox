import { StringValidator } from './StringValidator';

describe('StringValidator', () => {
  const validator = new StringValidator();

  describe('validate', () => {
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

    test('false when passing numbers', () => {
      expect(validator.validate(0)).toEqual(false);
      expect(validator.validate(1)).toEqual(false);
    });

    test('true when passing string', () => {
      expect(validator.validate('')).toEqual(true);
      expect(validator.validate('test')).toEqual(true);
    });
  });
});
