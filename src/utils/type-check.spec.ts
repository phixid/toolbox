import { TypeValidation } from './type-check';
import Primitives = TypeValidation.Primitives;
import NonPrimitives = TypeValidation.NonPrimitives;
import TypeChecker = TypeValidation.TypeChecker;

describe('TypeChecker', () => {
  test('handles booleans', () => {
    const booleanChecker = new TypeChecker(Primitives.Boolean);

    expect(booleanChecker.match(false)).toEqual(true);
    expect(booleanChecker.match(true)).toEqual(true);
    expect(booleanChecker.match(0)).toEqual(false);
    expect(booleanChecker.match(1)).toEqual(false);
    expect(booleanChecker.match('test')).toEqual(false);
    expect(booleanChecker.match([])).toEqual(false);
    expect(booleanChecker.match({})).toEqual(false);
    expect(booleanChecker.match(null)).toEqual(false);
    expect(booleanChecker.match(undefined)).toEqual(false);
  });

  test('handles array of booleans', () => {
    const booleanListChecker = new TypeChecker(NonPrimitives.ListBoolean);

    expect(booleanListChecker.match([false, true])).toEqual(true);
    expect(booleanListChecker.match([false, true, 0])).toEqual(false);
    expect(booleanListChecker.match([false, true, 1])).toEqual(false);
    expect(booleanListChecker.match([false, true, ''])).toEqual(false);
    expect(booleanListChecker.match([false, true, 'test'])).toEqual(false);
    expect(booleanListChecker.match([false, true, []])).toEqual(false);
    expect(booleanListChecker.match([false, true, {}])).toEqual(false);
    expect(booleanListChecker.match([false, true, null])).toEqual(false);
    expect(booleanListChecker.match([false, true, undefined])).toEqual(false);

    expect(booleanListChecker.match('')).toEqual(false);
    expect(booleanListChecker.match('test')).toEqual(false);
    expect(booleanListChecker.match(0)).toEqual(false);
    expect(booleanListChecker.match(1)).toEqual(false);
    expect(booleanListChecker.match(false)).toEqual(false);
    expect(booleanListChecker.match(true)).toEqual(false);
    expect(booleanListChecker.match([])).toEqual(false);
    expect(booleanListChecker.match({})).toEqual(false);
    expect(booleanListChecker.match(null)).toEqual(false);
    expect(booleanListChecker.match(undefined)).toEqual(false);
  });

  test('handles numbers', () => {
    const numberChecker = new TypeChecker(Primitives.Number);

    expect(numberChecker.match(0)).toEqual(true);
    expect(numberChecker.match(1)).toEqual(true);
    expect(numberChecker.match(false)).toEqual(false);
    expect(numberChecker.match(true)).toEqual(false);
    expect(numberChecker.match('test')).toEqual(false);
    expect(numberChecker.match([])).toEqual(false);
    expect(numberChecker.match({})).toEqual(false);
    expect(numberChecker.match(null)).toEqual(false);
    expect(numberChecker.match(undefined)).toEqual(false);
  });

  test('handles array of numbers', () => {
    const numberListChecker = new TypeChecker(NonPrimitives.ListNumber);

    expect(numberListChecker.match([0, 1])).toEqual(true);
    expect(numberListChecker.match([0, 1, false])).toEqual(false);
    expect(numberListChecker.match([0, 1, true])).toEqual(false);
    expect(numberListChecker.match([0, 1, ''])).toEqual(false);
    expect(numberListChecker.match([0, 1, 'test'])).toEqual(false);
    expect(numberListChecker.match([0, 1, []])).toEqual(false);
    expect(numberListChecker.match([0, 1, {}])).toEqual(false);
    expect(numberListChecker.match([0, 1, null])).toEqual(false);
    expect(numberListChecker.match([0, 1, undefined])).toEqual(false);

    expect(numberListChecker.match('')).toEqual(false);
    expect(numberListChecker.match('test')).toEqual(false);
    expect(numberListChecker.match(0)).toEqual(false);
    expect(numberListChecker.match(1)).toEqual(false);
    expect(numberListChecker.match(false)).toEqual(false);
    expect(numberListChecker.match(true)).toEqual(false);
    expect(numberListChecker.match([])).toEqual(false);
    expect(numberListChecker.match({})).toEqual(false);
    expect(numberListChecker.match(null)).toEqual(false);
    expect(numberListChecker.match(undefined)).toEqual(false);
  });

  test('handles strings', () => {
    const stringChecker = new TypeChecker(Primitives.String);

    expect(stringChecker.match('')).toEqual(true);
    expect(stringChecker.match('test')).toEqual(true);
    expect(stringChecker.match(0)).toEqual(false);
    expect(stringChecker.match(1)).toEqual(false);
    expect(stringChecker.match(false)).toEqual(false);
    expect(stringChecker.match(true)).toEqual(false);
    expect(stringChecker.match([])).toEqual(false);
    expect(stringChecker.match({})).toEqual(false);
    expect(stringChecker.match(null)).toEqual(false);
    expect(stringChecker.match(undefined)).toEqual(false);
  });

  test('handles array of string', () => {
    const stringListChecker = new TypeChecker(NonPrimitives.ListString);

    expect(stringListChecker.match(['', 'test'])).toEqual(true);
    expect(stringListChecker.match(['', 'test', false])).toEqual(false);
    expect(stringListChecker.match(['', 'test', true])).toEqual(false);
    expect(stringListChecker.match(['', 'test', 0])).toEqual(false);
    expect(stringListChecker.match(['', 'test', 1])).toEqual(false);
    expect(stringListChecker.match(['', 'test', []])).toEqual(false);
    expect(stringListChecker.match(['', 'test', {}])).toEqual(false);
    expect(stringListChecker.match(['', 'test', null])).toEqual(false);
    expect(stringListChecker.match(['', 'test', undefined])).toEqual(false);

    expect(stringListChecker.match('')).toEqual(false);
    expect(stringListChecker.match('test')).toEqual(false);
    expect(stringListChecker.match(0)).toEqual(false);
    expect(stringListChecker.match(1)).toEqual(false);
    expect(stringListChecker.match(false)).toEqual(false);
    expect(stringListChecker.match(true)).toEqual(false);
    expect(stringListChecker.match([])).toEqual(false);
    expect(stringListChecker.match({})).toEqual(false);
    expect(stringListChecker.match(null)).toEqual(false);
    expect(stringListChecker.match(undefined)).toEqual(false);
  });

  test('handles array of multiple types (strings, numbers and booleans)', () => {
    const anyListChecker = new TypeChecker(NonPrimitives.ListAny);

    expect(anyListChecker.match(['', 'test', 0, 1, false, true, [], {}, null, undefined])).toEqual(true);
    expect(anyListChecker.match('')).toEqual(false);
    expect(anyListChecker.match('test')).toEqual(false);
    expect(anyListChecker.match(0)).toEqual(false);
    expect(anyListChecker.match(1)).toEqual(false);
    expect(anyListChecker.match(false)).toEqual(false);
    expect(anyListChecker.match(true)).toEqual(false);
    expect(anyListChecker.match([])).toEqual(true);
    expect(anyListChecker.match({})).toEqual(false);
    expect(anyListChecker.match(null)).toEqual(false);
    expect(anyListChecker.match(undefined)).toEqual(false);
  });

  test('handles objects', () => {
    const objectChecker = new TypeChecker(NonPrimitives.Object);

    expect(objectChecker.match({})).toEqual(true);
    expect(objectChecker.match('')).toEqual(false);
    expect(objectChecker.match('test')).toEqual(false);
    expect(objectChecker.match(0)).toEqual(false);
    expect(objectChecker.match(1)).toEqual(false);
    expect(objectChecker.match(false)).toEqual(false);
    expect(objectChecker.match(true)).toEqual(false);
    expect(objectChecker.match([])).toEqual(false);
    expect(objectChecker.match(null)).toEqual(false);
    expect(objectChecker.match(undefined)).toEqual(false);
  });

  test('handles incorrect type', () => {
    // @ts-ignore
    const typeChecker = new TypeChecker('incorrectType');

    expect(typeChecker.match(false)).toEqual(false);
    expect(typeChecker.match(true)).toEqual(false);
    expect(typeChecker.match(0)).toEqual(false);
    expect(typeChecker.match(1)).toEqual(false);
    expect(typeChecker.match('test')).toEqual(false);
    expect(typeChecker.match([])).toEqual(false);
    expect(typeChecker.match({})).toEqual(false);
    expect(typeChecker.match(null)).toEqual(false);
    expect(typeChecker.match(undefined)).toEqual(false);
  });
});
