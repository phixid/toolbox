'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
var user_mock_1 = require('../../__mocks__/user-mock');
var index_1 = require('./index');
var validators = {
  boolean: new index_1.BooleanValidator(),
  number: new index_1.NumberValidator(),
  string: new index_1.StringValidator(),
};
var userModelValidator = new index_1.ModelValidator(user_mock_1.mockUserModel, validators);
describe('ModelValidator', function () {
  describe('ModelValidator.validate', function () {
    test('is a method', function () {
      expect(typeof userModelValidator.validate).toEqual('function');
    });
    test('result has an isValid property', function () {
      var isValid = userModelValidator.validate(user_mock_1.mockUser).isValid;
      expect(typeof isValid).toEqual('boolean');
    });
    test('result has an errors property', function () {
      var errors = userModelValidator.validate(user_mock_1.mockUser).errors;
      expect(errors).toEqual([]);
    });
    test('result is invalid when parameter is missing required properties', function () {
      var invalidUser = __assign({}, user_mock_1.mockUser);
      delete invalidUser.email;
      var _a = userModelValidator.validate(invalidUser),
        errors = _a.errors,
        isValid = _a.isValid;
      expect(isValid).toEqual(false);
      expect(errors).toEqual([
        'Model validation error: missing required property email',
        'Model validation error: expected email to have type string but has type undefined',
      ]);
    });
    test('result is invalid when parameter has a required property with the wrong type', function () {
      var invalidUser = __assign({}, user_mock_1.mockUser);
      // @ts-ignore
      invalidUser.email = 4;
      var _a = userModelValidator.validate(invalidUser),
        errors = _a.errors,
        isValid = _a.isValid;
      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: expected email to have type string but has type number']);
    });
    test('result is invalid when parameter has a non-required property with the wrong type', function () {
      var invalidUser = __assign({}, user_mock_1.mockUser);
      // @ts-ignore
      invalidUser.phone = 4;
      var _a = userModelValidator.validate(invalidUser),
        errors = _a.errors,
        isValid = _a.isValid;
      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: expected phone to have type string but has type number']);
    });
    test('result is valid when parameter has all required properties and the property types match', function () {
      var _a = userModelValidator.validate(user_mock_1.mockUser),
        errors = _a.errors,
        isValid = _a.isValid;
      expect(isValid).toEqual(true);
      expect(errors).toEqual([]);
    });
  });
});
