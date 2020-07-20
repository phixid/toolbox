'use strict';
exports.__esModule = true;
var NumberValidator_1 = require('./NumberValidator');
describe('NumberValidator', function () {
  var validator = new NumberValidator_1.NumberValidator();
  describe('validate', function () {
    test('false when passing string', function () {
      expect(validator.validate('')).toEqual(false);
      expect(validator.validate('test')).toEqual(false);
    });
    test('false when passing non-primitive values', function () {
      expect(validator.validate([])).toEqual(false);
      expect(validator.validate({})).toEqual(false);
      expect(validator.validate(null)).toEqual(false);
      expect(validator.validate(undefined)).toEqual(false);
    });
    test('true when passing boolean', function () {
      expect(validator.validate(false)).toEqual(false);
      expect(validator.validate(true)).toEqual(false);
    });
    test('true when passing numbers', function () {
      expect(validator.validate(0)).toEqual(true);
      expect(validator.validate(1)).toEqual(true);
    });
  });
});
