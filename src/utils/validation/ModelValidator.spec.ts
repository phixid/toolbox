import { mockUser, mockUserModel } from '../../__mocks__/user-mock';
import { BooleanValidator, ModelValidator, NumberValidator, StringValidator } from './index';

const validators = {
  boolean: new BooleanValidator(),
  number: new NumberValidator(),
  string: new StringValidator(),
};
const userModelValidator = new ModelValidator(mockUserModel, validators);

describe('ModelValidator', () => {
  describe('ModelValidator.validate', () => {
    test('is a method', () => {
      expect(typeof userModelValidator.validate).toEqual('function');
    });

    test('result has an isValid property', () => {
      const { isValid } = userModelValidator.validate(mockUser);
      expect(typeof isValid).toEqual('boolean');
    });

    test('result has an errors property', () => {
      const { errors } = userModelValidator.validate(mockUser);
      expect(errors).toEqual([]);
    });

    test('result is invalid when parameter is missing required properties', () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.email;
      const { errors, isValid } = userModelValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
      expect(errors).toEqual([
        'Model validation error: missing required property email',
        'Model validation error: expected email to have type string but has type undefined',
      ]);
    });

    test('result is invalid when parameter has a required property with the wrong type', () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.email = 4;
      const { errors, isValid } = userModelValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: expected email to have type string but has type number']);
    });

    test('result is invalid when parameter has a non-required property with the wrong type', () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.phone = 4;
      const { errors, isValid } = userModelValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: expected phone to have type string but has type number']);
    });

    test('result is valid when parameter has all required properties and the property types match', () => {
      const { errors, isValid } = userModelValidator.validate(mockUser);

      expect(isValid).toEqual(true);
      expect(errors).toEqual([]);
    });
  });
});
