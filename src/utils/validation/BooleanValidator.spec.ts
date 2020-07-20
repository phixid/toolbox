import { BooleanValidator } from './BooleanValidator';

describe('BooleanValidator', () => {
  const validator = new BooleanValidator();

  describe('validate', () => {
    test('false when passing numbers', () => {
      expect(validator.validate(0)).toEqual(false);
      expect(validator.validate(1)).toEqual(false);
    });

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
      expect(validator.validate(false)).toEqual(true);
      expect(validator.validate(true)).toEqual(true);
    });
  });
});
