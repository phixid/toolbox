'use strict';
exports.__esModule = true;
var BooleanValidator_1 = require('./BooleanValidator');
describe('BooleanValidator', function () {
  var validator = new BooleanValidator_1.BooleanValidator();
  describe('validate', function () {
    test('false when passing numbers', function () {
      expect(validator.validate(0)).toEqual(false);
      expect(validator.validate(1)).toEqual(false);
    });
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
      expect(validator.validate(false)).toEqual(true);
      expect(validator.validate(true)).toEqual(true);
    });
  });
});
