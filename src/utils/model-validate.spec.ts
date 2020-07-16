import { mockAddress } from '../__mocks__/address-mock';
import { mockUser, mockUserModel, mockUserWithAddress, mockUserWithAddressModel } from '../__mocks__/user-mock';
import { modelValidate } from './model-validate';

describe('modelValidate', () => {
  test('is a function', () => {
    expect(typeof modelValidate).toEqual('function');
  });

  describe('isValid property', () => {
    test('is false when obj is not an object', async () => {
      const { isValid: booleanIsValid } = await modelValidate(true, mockUserModel);
      const { isValid: numberIsValid } = await modelValidate(1, mockUserModel);
      const { isValid: stringIsValid } = await modelValidate('', mockUserModel);
      const { isValid: undefinedIsValid } = await modelValidate(undefined, mockUserModel);
      const { isValid: nullIsValid } = await modelValidate(null, mockUserModel);

      expect(booleanIsValid).toEqual(false);
      expect(numberIsValid).toEqual(false);
      expect(stringIsValid).toEqual(false);
      expect(undefinedIsValid).toEqual(false);
      expect(nullIsValid).toEqual(false);
    });

    test('is false when a required property is missing', async () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.email;
      const { isValid } = await modelValidate(invalidUser, mockUserModel);

      expect(isValid).toEqual(false);
    });

    test('is false when at least one property has the wrong type', async () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.firstname = 1;
      const { isValid } = await modelValidate(invalidUser, mockUserModel);

      expect(isValid).toEqual(false);
    });

    test('is true when required properties are present and types match', async () => {
      const { isValid } = await modelValidate(mockUser, mockUserModel);
      expect(isValid).toEqual(true);
    });

    test('is false when a required nested property is missing', async () => {
      const testUser = {
        ...mockUser,
        address: { ...mockAddress },
      };
      delete testUser.address.street;

      const { isValid } = await modelValidate(testUser, mockUserWithAddressModel);

      expect(isValid).toEqual(false);
    });

    test('is false when a nested property has the wrong type', async () => {
      const testUser = {
        ...mockUser,
        address: { ...mockAddress, street: 1 },
      };

      const { isValid } = await modelValidate(testUser, mockUserWithAddressModel);

      expect(isValid).toEqual(false);
    });

    test('is true when required nested properties are present and types match', async () => {
      const { isValid } = await modelValidate(mockUserWithAddress, mockUserWithAddressModel);

      expect(isValid).toEqual(true);
    });
  });

  describe('errors property', () => {
    test('is null when there are no errors', async () => {
      const { errors } = await modelValidate(mockUser, mockUserModel);

      expect(errors).toEqual(null);
    });

    test('is array of length x when there are errors', async () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.firstname;
      // @ts-ignore
      invalidUser.lastname = 1;

      const { errors } = await modelValidate(invalidUser, mockUserModel);

      expect(errors?.length).toEqual(3);
    });

    test('has a formatted error when obj is of the wrong type', async () => {
      const { errors: booleanErrors } = await modelValidate(true, mockUserModel);
      const { errors: numberErrors } = await modelValidate(1, mockUserModel);
      const { errors: stringErrors } = await modelValidate('', mockUserModel);
      const { errors: undefinedErrors } = await modelValidate(undefined, mockUserModel);
      const { errors: nullErrors } = await modelValidate(null, mockUserModel);

      expect(booleanErrors?.[0]).toEqual('Model validation error: obj is of type boolean');
      expect(numberErrors?.[0]).toEqual('Model validation error: obj is of type number');
      expect(stringErrors?.[0]).toEqual('Model validation error: obj is of type string');
      expect(undefinedErrors?.[0]).toEqual('Model validation error: obj is undefined');
      expect(nullErrors?.[0]).toEqual('Model validation error: obj is null');
    });

    test('has a formatted error when missing a required property', async () => {
      const invalidUser = { ...mockUser };
      delete invalidUser.firstname;

      const { errors } = await modelValidate(invalidUser, mockUserModel);

      expect(errors?.[0]).toEqual('Model validation error: missing required property firstname');
    });

    test('has a formatted error when missing a nested required property', async () => {
      const testUser = { ...mockUserWithAddress };
      delete testUser.address.street;

      const { errors, isValid } = await modelValidate(testUser, mockUserWithAddressModel);

      expect(errors?.[0]).toEqual('Model validation error: missing required property street');
      expect(isValid).toEqual(false);
    });

    test('has a formatted error when a property type does not match', async () => {
      const invalidUser = { ...mockUser };
      // @ts-ignore
      invalidUser.firstname = 1;

      const { errors } = await modelValidate(invalidUser, mockUserModel);

      expect(errors?.[0]).toEqual('Model validation error: property firstname has type number expected type string');
    });

    test('has a formatted error when a nested required property type does not match', async () => {
      const testUser = { ...mockUserWithAddress };
      // @ts-ignore
      testUser.address.street = 1;
      // @ts-ignore
      testUser.address.city = true;

      const { errors, isValid } = await modelValidate(testUser, mockUserWithAddressModel);

      expect(errors?.[0]).toEqual('Model validation error: property street has type number expected type string');
      expect(isValid).toEqual(false);
    });
  });
});
