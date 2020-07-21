import { ObjectValidator } from './ObjectValidator';

describe('ObjectValidator', () => {
  const validator = new ObjectValidator();

  describe('validate', () => {
    test('false when passing booleans', () => {
      expect(validator.validate(false)).toEqual(false);
      expect(validator.validate(true)).toEqual(false);
    });

    test('false when passing numbers', () => {
      expect(validator.validate(0)).toEqual(false);
      expect(validator.validate(1)).toEqual(false);
    });

    test('false when passing strings', () => {
      expect(validator.validate('')).toEqual(false);
      expect(validator.validate('test')).toEqual(false);
    });

    test('false when passing other non-primitive values', () => {
      expect(validator.validate([])).toEqual(false);
      expect(validator.validate(null)).toEqual(false);
      expect(validator.validate(undefined)).toEqual(false);
    });

    test('true when passing objects', () => {
      expect(validator.validate({})).toEqual(true);
      expect(validator.validate({ test: '' })).toEqual(true);
    });
  });
});
