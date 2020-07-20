import { ModelValidator } from './model-validate';
import { mockUser, mockUserModel } from '../__mocks__/user-mock';
import { BooleanValidator, NumberValidator, StringValidator } from './validation';

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

    test('result is invalid when parameter is missing required properties', () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.email;
      const { isValid } = userModelValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
    });

    test('result is invalid when parameter has a property with the wrong type', () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.email = 4;
      const { isValid } = userModelValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
    });

    test('result has an errors property', () => {
      const { errors } = userModelValidator.validate(mockUser);

      expect(errors).toEqual([]);
    });

    test('result has a list of formatted errors when parameter is missing required properties', () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.email;
      const { errors } = userModelValidator.validate(invalidUser);

      expect(errors).toEqual([
        'Model validation error: missing required property email',
        'Model validation error: expected email to have type string but has type undefined',
      ]);
    });

    test('result has a list of formatted errors when parameter has a property with the wrong type', () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.email = 4;
      const { errors } = userModelValidator.validate(invalidUser);

      expect(errors).toEqual(['Model validation error: expected email to have type string but has type number']);
    });
  });
});
