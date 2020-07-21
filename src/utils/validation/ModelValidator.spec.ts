import {
  invalidMockUserWithAddressModel,
  mockUser,
  mockUserModel,
  mockUserWithAddress,
  mockUserWithAddressModel,
} from '../../__mocks__/user-mock';
import { BooleanValidator, ModelValidator, NumberValidator, ObjectValidator, StringValidator } from './index';

const validators = {
  boolean: new BooleanValidator(),
  number: new NumberValidator(),
  object: new ObjectValidator(),
  string: new StringValidator(),
};
const userValidator = new ModelValidator(mockUserModel, validators);
const userWithAddressValidator = new ModelValidator(mockUserWithAddressModel, validators);
const invalidUserWithAddressValidator = new ModelValidator(invalidMockUserWithAddressModel, validators);

describe('ModelValidator', () => {
  describe('ModelValidator.validate', () => {
    test('is a method', () => {
      expect(typeof userValidator.validate).toEqual('function');
    });

    test('result has an isValid property', () => {
      const { isValid } = userValidator.validate(mockUser);
      expect(typeof isValid).toEqual('boolean');
    });

    test('result has an errors property', () => {
      const { errors } = userValidator.validate(mockUser);
      expect(errors).toEqual([]);
    });

    test('result is invalid when parameter is missing required properties', () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.email;
      const { errors, isValid } = userValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: missing required property email']);
    });

    test('result is invalid when parameter has a required property with the wrong type', () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.email = 4;
      const { errors, isValid } = userValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: expected email to have type string but has type number']);
    });

    test('result is invalid when parameter has a non-required property with the wrong type', () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.phone = 4;
      const { errors, isValid } = userValidator.validate(invalidUser);

      expect(isValid).toEqual(false);
      expect(errors).toEqual(['Model validation error: expected phone to have type string but has type number']);
    });

    test('result is valid when parameter has all required properties and the property types match', () => {
      const { errors, isValid } = userValidator.validate(mockUser);

      expect(isValid).toEqual(true);
      expect(errors).toEqual([]);
    });

    test('result is invalid when missing nested required parameters', () => {
      const userWithInvalidAddress = { ...mockUserWithAddress };
      delete userWithInvalidAddress.address.street;
      const { errors, isValid } = userWithAddressValidator.validate(userWithInvalidAddress);

      expect(errors).toEqual(['Model validation error: missing required property street']);
      expect(isValid).toEqual(false);
    });

    test('result is invalid when missing nested required parameters', () => {
      const userWithInvalidAddress = { ...mockUserWithAddress };
      delete userWithInvalidAddress.address.street;
      const { errors, isValid } = invalidUserWithAddressValidator.validate(userWithInvalidAddress);

      expect(errors).toEqual(['Model validation error: nested model address does not have an assigned model']);
      expect(isValid).toEqual(false);
    });
  });
});
