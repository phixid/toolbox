import { NonPrimitives, Primitives, TypeValidator } from './type-validator';

describe('TypeValidator', () => {
  test('handles booleans', () => {
    const booleanChecker = new TypeValidator(Primitives.Boolean);

    expect(booleanChecker.validate(false)).toEqual(true);
    expect(booleanChecker.validate(true)).toEqual(true);
    expect(booleanChecker.validate(0)).toEqual(false);
    expect(booleanChecker.validate(1)).toEqual(false);
    expect(booleanChecker.validate('test')).toEqual(false);
    expect(booleanChecker.validate([])).toEqual(false);
    expect(booleanChecker.validate({})).toEqual(false);
    expect(booleanChecker.validate(null)).toEqual(false);
    expect(booleanChecker.validate(undefined)).toEqual(false);
  });

  test('handles array of booleans', () => {
    const booleanListChecker = new TypeValidator(NonPrimitives.ListBoolean);

    expect(booleanListChecker.validate([false, true])).toEqual(true);
    expect(booleanListChecker.validate([false, true, 0])).toEqual(false);
    expect(booleanListChecker.validate([false, true, 1])).toEqual(false);
    expect(booleanListChecker.validate([false, true, ''])).toEqual(false);
    expect(booleanListChecker.validate([false, true, 'test'])).toEqual(false);
    expect(booleanListChecker.validate([false, true, []])).toEqual(false);
    expect(booleanListChecker.validate([false, true, {}])).toEqual(false);
    expect(booleanListChecker.validate([false, true, null])).toEqual(false);
    expect(booleanListChecker.validate([false, true, undefined])).toEqual(false);

    expect(booleanListChecker.validate('')).toEqual(false);
    expect(booleanListChecker.validate('test')).toEqual(false);
    expect(booleanListChecker.validate(0)).toEqual(false);
    expect(booleanListChecker.validate(1)).toEqual(false);
    expect(booleanListChecker.validate(false)).toEqual(false);
    expect(booleanListChecker.validate(true)).toEqual(false);
    expect(booleanListChecker.validate([])).toEqual(false);
    expect(booleanListChecker.validate({})).toEqual(false);
    expect(booleanListChecker.validate(null)).toEqual(false);
    expect(booleanListChecker.validate(undefined)).toEqual(false);
  });

  test('handles numbers', () => {
    const numberChecker = new TypeValidator(Primitives.Number);

    expect(numberChecker.validate(0)).toEqual(true);
    expect(numberChecker.validate(1)).toEqual(true);
    expect(numberChecker.validate(false)).toEqual(false);
    expect(numberChecker.validate(true)).toEqual(false);
    expect(numberChecker.validate('test')).toEqual(false);
    expect(numberChecker.validate([])).toEqual(false);
    expect(numberChecker.validate({})).toEqual(false);
    expect(numberChecker.validate(null)).toEqual(false);
    expect(numberChecker.validate(undefined)).toEqual(false);
  });

  test('handles array of numbers', () => {
    const numberListChecker = new TypeValidator(NonPrimitives.ListNumber);

    expect(numberListChecker.validate([0, 1])).toEqual(true);
    expect(numberListChecker.validate([0, 1, false])).toEqual(false);
    expect(numberListChecker.validate([0, 1, true])).toEqual(false);
    expect(numberListChecker.validate([0, 1, ''])).toEqual(false);
    expect(numberListChecker.validate([0, 1, 'test'])).toEqual(false);
    expect(numberListChecker.validate([0, 1, []])).toEqual(false);
    expect(numberListChecker.validate([0, 1, {}])).toEqual(false);
    expect(numberListChecker.validate([0, 1, null])).toEqual(false);
    expect(numberListChecker.validate([0, 1, undefined])).toEqual(false);

    expect(numberListChecker.validate('')).toEqual(false);
    expect(numberListChecker.validate('test')).toEqual(false);
    expect(numberListChecker.validate(0)).toEqual(false);
    expect(numberListChecker.validate(1)).toEqual(false);
    expect(numberListChecker.validate(false)).toEqual(false);
    expect(numberListChecker.validate(true)).toEqual(false);
    expect(numberListChecker.validate([])).toEqual(false);
    expect(numberListChecker.validate({})).toEqual(false);
    expect(numberListChecker.validate(null)).toEqual(false);
    expect(numberListChecker.validate(undefined)).toEqual(false);
  });

  test('handles strings', () => {
    const stringChecker = new TypeValidator(Primitives.String);

    expect(stringChecker.validate('')).toEqual(true);
    expect(stringChecker.validate('test')).toEqual(true);
    expect(stringChecker.validate(0)).toEqual(false);
    expect(stringChecker.validate(1)).toEqual(false);
    expect(stringChecker.validate(false)).toEqual(false);
    expect(stringChecker.validate(true)).toEqual(false);
    expect(stringChecker.validate([])).toEqual(false);
    expect(stringChecker.validate({})).toEqual(false);
    expect(stringChecker.validate(null)).toEqual(false);
    expect(stringChecker.validate(undefined)).toEqual(false);
  });

  test('handles array of string', () => {
    const stringListChecker = new TypeValidator(NonPrimitives.ListString);

    expect(stringListChecker.validate(['', 'test'])).toEqual(true);
    expect(stringListChecker.validate(['', 'test', false])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', true])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', 0])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', 1])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', []])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', {}])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', null])).toEqual(false);
    expect(stringListChecker.validate(['', 'test', undefined])).toEqual(false);

    expect(stringListChecker.validate('')).toEqual(false);
    expect(stringListChecker.validate('test')).toEqual(false);
    expect(stringListChecker.validate(0)).toEqual(false);
    expect(stringListChecker.validate(1)).toEqual(false);
    expect(stringListChecker.validate(false)).toEqual(false);
    expect(stringListChecker.validate(true)).toEqual(false);
    expect(stringListChecker.validate([])).toEqual(false);
    expect(stringListChecker.validate({})).toEqual(false);
    expect(stringListChecker.validate(null)).toEqual(false);
    expect(stringListChecker.validate(undefined)).toEqual(false);
  });

  test('handles array of multiple types (strings, numbers and booleans)', () => {
    const anyListChecker = new TypeValidator(NonPrimitives.ListAny);

    expect(anyListChecker.validate(['', 'test', 0, 1, false, true, [], {}, null, undefined])).toEqual(true);
    expect(anyListChecker.validate('')).toEqual(false);
    expect(anyListChecker.validate('test')).toEqual(false);
    expect(anyListChecker.validate(0)).toEqual(false);
    expect(anyListChecker.validate(1)).toEqual(false);
    expect(anyListChecker.validate(false)).toEqual(false);
    expect(anyListChecker.validate(true)).toEqual(false);
    expect(anyListChecker.validate([])).toEqual(true);
    expect(anyListChecker.validate({})).toEqual(false);
    expect(anyListChecker.validate(null)).toEqual(false);
    expect(anyListChecker.validate(undefined)).toEqual(false);
  });

  test('handles objects', () => {
    const objectChecker = new TypeValidator(NonPrimitives.Object);

    expect(objectChecker.validate({})).toEqual(true);
    expect(objectChecker.validate('')).toEqual(false);
    expect(objectChecker.validate('test')).toEqual(false);
    expect(objectChecker.validate(0)).toEqual(false);
    expect(objectChecker.validate(1)).toEqual(false);
    expect(objectChecker.validate(false)).toEqual(false);
    expect(objectChecker.validate(true)).toEqual(false);
    expect(objectChecker.validate([])).toEqual(false);
    expect(objectChecker.validate(null)).toEqual(false);
    expect(objectChecker.validate(undefined)).toEqual(false);
  });

  test('handles incorrect type', () => {
    // @ts-ignore
    const typeChecker = new TypeValidator('incorrectType');

    expect(typeChecker.validate(false)).toEqual(false);
    expect(typeChecker.validate(true)).toEqual(false);
    expect(typeChecker.validate(0)).toEqual(false);
    expect(typeChecker.validate(1)).toEqual(false);
    expect(typeChecker.validate('test')).toEqual(false);
    expect(typeChecker.validate([])).toEqual(false);
    expect(typeChecker.validate({})).toEqual(false);
    expect(typeChecker.validate(null)).toEqual(false);
    expect(typeChecker.validate(undefined)).toEqual(false);
  });
});
