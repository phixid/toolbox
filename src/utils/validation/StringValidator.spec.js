'use strict';
exports.__esModule = true;
var StringValidator_1 = require('./StringValidator');
describe('StringValidator', function () {
  var validator = new StringValidator_1.StringValidator();
  describe('validate', function () {
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
    test('false when passing numbers', function () {
      expect(validator.validate(0)).toEqual(false);
      expect(validator.validate(1)).toEqual(false);
    });
    test('true when passing string', function () {
      expect(validator.validate('')).toEqual(true);
      expect(validator.validate('test')).toEqual(true);
    });
  });
});
