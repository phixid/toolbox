import { mockUser, mockUserModel, mockUserWithAddress, mockUserWithAddressModel } from './__mocks__/user.mock';
import { DataModel, DataType, typeCheck } from './index';
import { mockAddress } from './__mocks__/address.mock';

const mockModel = DataModel(mockUserModel);

describe('Model', () => {
  describe('validate', () => {
    test('is a function', () => {
      expect(typeof mockModel.validate).toEqual('function');
    });

    describe('isValid property', () => {
      test('is false when obj is not an object', async () => {
        const { isValid: booleanIsValid } = await mockModel.validate(true);
        const { isValid: numberIsValid } = await mockModel.validate(1);
        const { isValid: stringIsValid } = await mockModel.validate('');
        const { isValid: undefinedIsValid } = await mockModel.validate(undefined);
        const { isValid: nullIsValid } = await mockModel.validate(null);

        expect(booleanIsValid).toEqual(false);
        expect(numberIsValid).toEqual(false);
        expect(stringIsValid).toEqual(false);
        expect(undefinedIsValid).toEqual(false);
        expect(nullIsValid).toEqual(false);
      });

      test('is false when a required property is missing', async () => {
        const invalidUser = { ...mockUser };
        delete invalidUser.email;
        const { isValid } = await mockModel.validate(invalidUser);

        expect(isValid).toEqual(false);
      });

      test('is false when at least one property has the wrong type', async () => {
        const invalidUser = { ...mockUser };
        // @ts-ignore
        invalidUser.firstname = 1;
        const { isValid } = await mockModel.validate(invalidUser);

        expect(isValid).toEqual(false);
      });

      test('is true when required properties are present and types match', async () => {
        const { isValid } = await mockModel.validate(mockUser);

        expect(isValid).toEqual(true);
      });

      test('is false when a required nested property is missing', async () => {
        const testUser = {
          ...mockUser,
          address: { ...mockAddress },
        };
        delete testUser.address.street;

        const mockAddressModel = DataModel(mockUserWithAddressModel);
        const { isValid } = await mockAddressModel.validate(testUser);

        expect(isValid).toEqual(false);
      });

      test('is false when a nested property has the wrong type', async () => {
        const testUser = {
          ...mockUser,
          address: { ...mockAddress, street: 1 },
        };

        const mockAddressModel = DataModel(mockUserWithAddressModel);
        const { isValid } = await mockAddressModel.validate(testUser);

        expect(isValid).toEqual(false);
      });

      test('is true when required nested properties are present and types match', async () => {
        const mockAddressModel = DataModel(mockUserWithAddressModel);
        const { isValid } = await mockAddressModel.validate(mockUserWithAddress);

        expect(isValid).toEqual(true);
      });
      // test('handles properties that are lists of complex models ', () => {});
    });

    describe('errors property', () => {
      test('is null when there are no errors', async () => {
        const { errors } = await mockModel.validate(mockUser);

        expect(errors).toEqual(null);
      });

      test('is array of length x when there are errors', async () => {
        const invalidUser = { ...mockUser };
        delete invalidUser.firstname;
        // @ts-ignore
        invalidUser.lastname = 1;

        const { errors } = await mockModel.validate(invalidUser);

        expect(errors?.length).toEqual(3);
      });

      test('has a formatted error when obj is of the wrong type', async () => {
        const { errors: booleanErrors } = await mockModel.validate(true);
        const { errors: numberErrors } = await mockModel.validate(1);
        const { errors: stringErrors } = await mockModel.validate('');
        const { errors: undefinedErrors } = await mockModel.validate(undefined);
        const { errors: nullErrors } = await mockModel.validate(null);

        expect(booleanErrors?.[0]).toEqual('Model validation error: obj is of type boolean');
        expect(numberErrors?.[0]).toEqual('Model validation error: obj is of type number');
        expect(stringErrors?.[0]).toEqual('Model validation error: obj is of type string');
        expect(undefinedErrors?.[0]).toEqual('Model validation error: obj is undefined');
        expect(nullErrors?.[0]).toEqual('Model validation error: obj is null');
      });

      test('has a formatted error when missing a required property', async () => {
        const invalidUser = { ...mockUser };
        delete invalidUser.firstname;

        const { errors } = await mockModel.validate(invalidUser);

        expect(errors?.[0]).toEqual('Model validation error: missing required property firstname');
      });

      test('has a formatted error when missing a nested required property', async () => {
        const testUser = { ...mockUserWithAddress };
        delete testUser.address.street;

        const mockAddressModel = DataModel(mockUserWithAddressModel);
        const { errors, isValid } = await mockAddressModel.validate(testUser);

        expect(errors?.[0]).toEqual('Model validation error: missing required property street');
        expect(isValid).toEqual(false);
      });

      test('has a formatted error when a property type does not match', async () => {
        const invalidUser = { ...mockUser };
        // @ts-ignore
        invalidUser.firstname = 1;

        const { errors } = await mockModel.validate(invalidUser);

        expect(errors?.[0]).toEqual('Model validation error: property firstname has type number expected type string');
      });

      test('has a formatted error when a nested required property type does not match', async () => {
        const testUser = { ...mockUserWithAddress };
        // @ts-ignore
        testUser.address.street = 1;
        // @ts-ignore
        testUser.address.city = true;

        const mockAddressModel = DataModel(mockUserWithAddressModel);
        const { errors, isValid } = await mockAddressModel.validate(testUser);

        expect(errors?.[0]).toEqual('Model validation error: property street has type number expected type string');
        expect(isValid).toEqual(false);
      });
    });

    describe('output property', () => {
      // test('is null when the input does not match the model', () => {});
      // test('is an object when the input matches the model', () => {});
    });
  });
});

describe('typeCheck', () => {
  test('handles booleans', () => {
    expect(typeCheck(false, DataType.Boolean)).toEqual(true);
    expect(typeCheck(true, DataType.Boolean)).toEqual(true);
    expect(typeCheck(0, DataType.Boolean)).toEqual(false);
    expect(typeCheck(1, DataType.Boolean)).toEqual(false);
    expect(typeCheck('test', DataType.Boolean)).toEqual(false);
    expect(typeCheck([], DataType.Boolean)).toEqual(false);
    expect(typeCheck({}, DataType.Boolean)).toEqual(false);
    expect(typeCheck(null, DataType.Boolean)).toEqual(false);
    expect(typeCheck(undefined, DataType.Boolean)).toEqual(false);
  });

  test('handles array of booleans', () => {
    expect(typeCheck([false, true], DataType.BooleanList)).toEqual(true);
    expect(typeCheck([false, true, 0], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, 1], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, ''], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, 'test'], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, []], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, {}], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, null], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, undefined], DataType.BooleanList)).toEqual(false);

    expect(typeCheck('', DataType.BooleanList)).toEqual(false);
    expect(typeCheck('test', DataType.BooleanList)).toEqual(false);
    expect(typeCheck(0, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(1, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(false, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(true, DataType.BooleanList)).toEqual(false);
    expect(typeCheck([], DataType.BooleanList)).toEqual(false);
    expect(typeCheck({}, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(null, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(undefined, DataType.BooleanList)).toEqual(false);
  });

  test('handles numbers', () => {
    expect(typeCheck(0, DataType.Number)).toEqual(true);
    expect(typeCheck(1, DataType.Number)).toEqual(true);
    expect(typeCheck(false, DataType.Number)).toEqual(false);
    expect(typeCheck(true, DataType.Number)).toEqual(false);
    expect(typeCheck('test', DataType.Number)).toEqual(false);
    expect(typeCheck([], DataType.Number)).toEqual(false);
    expect(typeCheck({}, DataType.Number)).toEqual(false);
    expect(typeCheck(null, DataType.Number)).toEqual(false);
    expect(typeCheck(undefined, DataType.Number)).toEqual(false);
  });

  test('handles array of numbers', () => {
    expect(typeCheck([0, 1], DataType.NumberList)).toEqual(true);
    expect(typeCheck([0, 1, false], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, true], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, ''], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, 'test'], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, []], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, {}], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, null], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, undefined], DataType.NumberList)).toEqual(false);

    expect(typeCheck('', DataType.NumberList)).toEqual(false);
    expect(typeCheck('test', DataType.NumberList)).toEqual(false);
    expect(typeCheck(0, DataType.NumberList)).toEqual(false);
    expect(typeCheck(1, DataType.NumberList)).toEqual(false);
    expect(typeCheck(false, DataType.NumberList)).toEqual(false);
    expect(typeCheck(true, DataType.NumberList)).toEqual(false);
    expect(typeCheck([], DataType.NumberList)).toEqual(false);
    expect(typeCheck({}, DataType.NumberList)).toEqual(false);
    expect(typeCheck(null, DataType.NumberList)).toEqual(false);
    expect(typeCheck(undefined, DataType.NumberList)).toEqual(false);
  });

  test('handles strings', () => {
    expect(typeCheck('', DataType.String)).toEqual(true);
    expect(typeCheck('test', DataType.String)).toEqual(true);
    expect(typeCheck(0, DataType.String)).toEqual(false);
    expect(typeCheck(1, DataType.String)).toEqual(false);
    expect(typeCheck(false, DataType.String)).toEqual(false);
    expect(typeCheck(true, DataType.String)).toEqual(false);
    expect(typeCheck([], DataType.String)).toEqual(false);
    expect(typeCheck({}, DataType.String)).toEqual(false);
    expect(typeCheck(null, DataType.String)).toEqual(false);
    expect(typeCheck(undefined, DataType.String)).toEqual(false);
  });

  test('handles array of string', () => {
    expect(typeCheck(['', 'test'], DataType.StringList)).toEqual(true);
    expect(typeCheck(['', 'test', false], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', true], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', 0], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', 1], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', []], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', {}], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', null], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', undefined], DataType.StringList)).toEqual(false);

    expect(typeCheck('', DataType.StringList)).toEqual(false);
    expect(typeCheck('test', DataType.StringList)).toEqual(false);
    expect(typeCheck(0, DataType.StringList)).toEqual(false);
    expect(typeCheck(1, DataType.StringList)).toEqual(false);
    expect(typeCheck(false, DataType.StringList)).toEqual(false);
    expect(typeCheck(true, DataType.StringList)).toEqual(false);
    expect(typeCheck([], DataType.StringList)).toEqual(false);
    expect(typeCheck({}, DataType.StringList)).toEqual(false);
    expect(typeCheck(null, DataType.StringList)).toEqual(false);
    expect(typeCheck(undefined, DataType.StringList)).toEqual(false);
  });

  test('handles array of multiple types (strings, numbers and booleans)', () => {
    expect(typeCheck(['', 'test', 0, 1, false, true, [], {}, null, undefined], DataType.GenericList)).toEqual(true);

    expect(typeCheck('', DataType.GenericList)).toEqual(false);
    expect(typeCheck('test', DataType.GenericList)).toEqual(false);
    expect(typeCheck(0, DataType.GenericList)).toEqual(false);
    expect(typeCheck(1, DataType.GenericList)).toEqual(false);
    expect(typeCheck(false, DataType.GenericList)).toEqual(false);
    expect(typeCheck(true, DataType.GenericList)).toEqual(false);
    expect(typeCheck([], DataType.GenericList)).toEqual(true);
    expect(typeCheck({}, DataType.GenericList)).toEqual(false);
    expect(typeCheck(null, DataType.GenericList)).toEqual(false);
    expect(typeCheck(undefined, DataType.GenericList)).toEqual(false);
  });

  test('handles objects', () => {
    expect(typeCheck({}, DataType.Object)).toEqual(true);
    expect(typeCheck('', DataType.Object)).toEqual(false);
    expect(typeCheck('test', DataType.Object)).toEqual(false);
    expect(typeCheck(0, DataType.Object)).toEqual(false);
    expect(typeCheck(1, DataType.Object)).toEqual(false);
    expect(typeCheck(false, DataType.Object)).toEqual(false);
    expect(typeCheck(true, DataType.Object)).toEqual(false);
    expect(typeCheck([], DataType.Object)).toEqual(false);
    expect(typeCheck(null, DataType.Object)).toEqual(false);
    expect(typeCheck(undefined, DataType.Object)).toEqual(false);
  });

  test('handles incorrect type', () => {
    // @ts-ignore
    expect(typeCheck(0, 'incorrectType')).toEqual(false);
  });
});
