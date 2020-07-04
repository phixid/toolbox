import {Model, ModelType, typeCheck} from './index';

const mockUserModel: ModelType = {
    firstname: { required: true, type: 'string' },
    lastname: { required: true, type: 'string' },
    email: { required: true, type: 'string' },
    phone: { type: 'string' },
};

const mockUser = {
    firstname: 'Kristof',
    lastname: 'Hermans',
    email: 'kristof.hermans@golden-giraffes.be'
};

describe('Model', () => {
    describe('validate', () => {
        test('is a function', () => {
            expect(typeof Model.validate).toEqual('function');
        });

        describe('isValid property', () => {
            test('is false when a required property is missing', () => {
                const invalidUser = { ...mockUser };
                delete invalidUser.email;

                expect(Model.validate(mockUserModel, invalidUser).isValid).toEqual(false);
            });
            // test('is false when at least one property has the wrong type', () => {});
            test('is true when required properties are present and types match', () => {
                expect(Model.validate(mockUserModel, mockUser).isValid).toEqual(true);
            });

            // test('handles properties that are complex models', () => {});
            // test('handles properties that are lists of complex models ', () => {});
        });

        describe('errors property', () => {
            // test('is null when there are no errors', () => {});
            // test('is array of length x when there are errors', () => {});
        });

        describe('output property', () => {
            // test('is an object when the input matches the model', () => {});
            // test('is null when the input does not match the model', () => {});
        });
    });
});

describe('typeCheck', () => {
    test('handles booleans', () => {
        expect(typeCheck(false, 'boolean')).toEqual(true);
        expect(typeCheck(true, 'boolean')).toEqual(true);
        expect(typeCheck(0, 'boolean')).toEqual(false);
        expect(typeCheck(1, 'boolean')).toEqual(false);
        expect(typeCheck('test', 'boolean')).toEqual(false);
        expect(typeCheck([], 'boolean')).toEqual(false);
        expect(typeCheck({}, 'boolean')).toEqual(false);
        expect(typeCheck(null, 'boolean')).toEqual(false);
        expect(typeCheck(undefined, 'boolean')).toEqual(false);
    });

    test('handles array of booleans', () => {
        expect(typeCheck([false, true], 'boolean[]')).toEqual(true);
        expect(typeCheck([false, true, 0], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, 1], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, ''], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, 'test'], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, []], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, {}], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, null], 'boolean[]')).toEqual(false);
        expect(typeCheck([false, true, undefined], 'boolean[]')).toEqual(false);

        expect(typeCheck('', 'boolean[]')).toEqual(false);
        expect(typeCheck('test', 'boolean[]')).toEqual(false);
        expect(typeCheck(0, 'boolean[]')).toEqual(false);
        expect(typeCheck(1, 'boolean[]')).toEqual(false);
        expect(typeCheck(false, 'boolean[]')).toEqual(false);
        expect(typeCheck(true, 'boolean[]')).toEqual(false);
        expect(typeCheck([], 'boolean[]')).toEqual(false);
        expect(typeCheck({}, 'boolean[]')).toEqual(false);
        expect(typeCheck(null, 'boolean[]')).toEqual(false);
        expect(typeCheck(undefined, 'boolean[]')).toEqual(false);
    });

    test('handles numbers', () => {
        expect(typeCheck(0, 'number')).toEqual(true);
        expect(typeCheck(1, 'number')).toEqual(true);
        expect(typeCheck(false, 'number')).toEqual(false);
        expect(typeCheck(true, 'number')).toEqual(false);
        expect(typeCheck('test', 'number')).toEqual(false);
        expect(typeCheck([], 'number')).toEqual(false);
        expect(typeCheck({}, 'number')).toEqual(false);
        expect(typeCheck(null, 'number')).toEqual(false);
        expect(typeCheck(undefined, 'number')).toEqual(false);
    });

    test('handles array of numbers', () => {
        expect(typeCheck([0, 1], 'number[]')).toEqual(true);
        expect(typeCheck([0, 1, false], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, true], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, ''], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, 'test'], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, []], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, {}], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, null], 'number[]')).toEqual(false);
        expect(typeCheck([0, 1, undefined], 'number[]')).toEqual(false);

        expect(typeCheck('', 'number[]')).toEqual(false);
        expect(typeCheck('test', 'number[]')).toEqual(false);
        expect(typeCheck(0, 'number[]')).toEqual(false);
        expect(typeCheck(1, 'number[]')).toEqual(false);
        expect(typeCheck(false, 'number[]')).toEqual(false);
        expect(typeCheck(true, 'number[]')).toEqual(false);
        expect(typeCheck([], 'number[]')).toEqual(false);
        expect(typeCheck({}, 'number[]')).toEqual(false);
        expect(typeCheck(null, 'number[]')).toEqual(false);
        expect(typeCheck(undefined, 'number[]')).toEqual(false);
    });

    test('handles strings', () => {
        expect(typeCheck('', 'string')).toEqual(true);
        expect(typeCheck('test', 'string')).toEqual(true);
        expect(typeCheck(0, 'string')).toEqual(false);
        expect(typeCheck(1, 'string')).toEqual(false);
        expect(typeCheck(false, 'string')).toEqual(false);
        expect(typeCheck(true, 'string')).toEqual(false);
        expect(typeCheck([], 'string')).toEqual(false);
        expect(typeCheck({}, 'string')).toEqual(false);
        expect(typeCheck(null, 'string')).toEqual(false);
        expect(typeCheck(undefined, 'string')).toEqual(false);
    });

    test('handles array of string', () => {
        expect(typeCheck(['', 'test'], 'string[]')).toEqual(true);
        expect(typeCheck(['', 'test', false], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', true], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', 0], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', 1], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', []], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', {}], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', null], 'string[]')).toEqual(false);
        expect(typeCheck(['', 'test', undefined], 'string[]')).toEqual(false);

        expect(typeCheck('', 'string[]')).toEqual(false);
        expect(typeCheck('test', 'string[]')).toEqual(false);
        expect(typeCheck(0, 'string[]')).toEqual(false);
        expect(typeCheck(1, 'string[]')).toEqual(false);
        expect(typeCheck(false, 'string[]')).toEqual(false);
        expect(typeCheck(true, 'string[]')).toEqual(false);
        expect(typeCheck([], 'string[]')).toEqual(false);
        expect(typeCheck({}, 'string[]')).toEqual(false);
        expect(typeCheck(null, 'string[]')).toEqual(false);
        expect(typeCheck(undefined, 'string[]')).toEqual(false);
    });

    test('handles array of multiple types (strings, numbers and booleans)', () => {
        expect(typeCheck(['', 'test', 0, 1, false, true, [], {}, null, undefined], '[]')).toEqual(true);

        expect(typeCheck('', '[]')).toEqual(false);
        expect(typeCheck('test', '[]')).toEqual(false);
        expect(typeCheck(0, '[]')).toEqual(false);
        expect(typeCheck(1, '[]')).toEqual(false);
        expect(typeCheck(false, '[]')).toEqual(false);
        expect(typeCheck(true, '[]')).toEqual(false);
        expect(typeCheck([], '[]')).toEqual(true);
        expect(typeCheck({}, '[]')).toEqual(false);
        expect(typeCheck(null, '[]')).toEqual(false);
        expect(typeCheck(undefined, '[]')).toEqual(false);
    });

    test('handles incorrect type', () => {
        // @ts-ignore
        expect(typeCheck(0, 'incorrectType')).toEqual(false);
    });
});
