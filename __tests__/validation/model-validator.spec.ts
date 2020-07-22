import {
  invalidMockUserWithAddressModel,
  mockUser,
  mockUserModel,
  mockUserWithAddress,
  mockUserWithAddressModel,
} from '../../__mocks__/user-mock';
import { BooleanValidator, ModelValidator, NumberValidator, ObjectValidator, StringValidator } from '../../lib';

const validators = {
  boolean: new BooleanValidator(),
  number: new NumberValidator(),
  object: new ObjectValidator(),
  string: new StringValidator(),
};
const userValidator = new ModelValidator(mockUserModel, validators);

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
      expect(Array.isArray(errors)).toEqual(true);
    });

    describe('required property validation', () => {
      test('result is invalid when parameter is missing required properties', () => {
        const invalidUser = { ...mockUser };
        delete invalidUser.email;
        const { errors, isValid } = userValidator.validate(invalidUser);

        expect(isValid).toEqual(false);
        expect(errors).toEqual(['Model validation error: missing required property email']);
      });
    });

    describe('property type validation', () => {
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
    });

    describe('nested models', () => {
      const userWithAddressValidator = new ModelValidator(mockUserWithAddressModel, validators);

      test('result is invalid when missing nested required parameters', () => {
        const userWithInvalidAddress = { ...mockUserWithAddress };
        delete userWithInvalidAddress.address.street;
        const { errors, isValid } = userWithAddressValidator.validate(userWithInvalidAddress);

        expect(errors).toEqual(['Model validation error: missing required property street']);
        expect(isValid).toEqual(false);
      });
    });

    describe('validates an object based on a model', () => {
      test('result is valid when parameter has all required properties and the property types match', () => {
        const { errors, isValid } = userValidator.validate(mockUser);

        expect(isValid).toEqual(true);
        expect(errors).toEqual([]);
      });
    });

    describe('validation of the ModelValidator', () => {
      test('warns when the model missing a nested model', () => {
        const invalidUserWithAddressValidator = new ModelValidator(invalidMockUserWithAddressModel, validators);
        const { errors, isValid } = invalidUserWithAddressValidator.validate(mockUserWithAddress);

        expect(errors).toEqual(['Model validation error: missing nested model for key address']);
        expect(isValid).toEqual(false);
      });

      test('warns when missing a typeValidator', () => {
        const invalidValidators = { ...validators };
        delete invalidValidators.string;
        const userValidatorWithInvalidValidators = new ModelValidator(mockUserModel, invalidValidators);
        const { errors, isValid } = userValidatorWithInvalidValidators.validate(mockUser);

        expect(errors).toEqual(['Model validation error: missing validator for type string']);
        expect(isValid).toEqual(false);
      });
    });
  });
});
