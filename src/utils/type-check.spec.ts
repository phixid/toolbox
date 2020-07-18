import { NonPrimitive, Primitive, typeCheck } from './type-check';

describe('typeCheck', () => {
  test('handles booleans', () => {
    expect(typeCheck(false, Primitive.Boolean)).toEqual(true);
    expect(typeCheck(true, Primitive.Boolean)).toEqual(true);
    expect(typeCheck(0, Primitive.Boolean)).toEqual(false);
    expect(typeCheck(1, Primitive.Boolean)).toEqual(false);
    expect(typeCheck('test', Primitive.Boolean)).toEqual(false);
    expect(typeCheck([], Primitive.Boolean)).toEqual(false);
    expect(typeCheck({}, Primitive.Boolean)).toEqual(false);
    expect(typeCheck(null, Primitive.Boolean)).toEqual(false);
    expect(typeCheck(undefined, Primitive.Boolean)).toEqual(false);
  });

  test('handles array of booleans', () => {
    expect(typeCheck([false, true], NonPrimitive.ListBoolean)).toEqual(true);
    expect(typeCheck([false, true, 0], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, 1], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, ''], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, 'test'], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, []], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, {}], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, null], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([false, true, undefined], NonPrimitive.ListBoolean)).toEqual(false);

    expect(typeCheck('', NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck('test', NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck(0, NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck(1, NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck(false, NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck(true, NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck([], NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck({}, NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck(null, NonPrimitive.ListBoolean)).toEqual(false);
    expect(typeCheck(undefined, NonPrimitive.ListBoolean)).toEqual(false);
  });

  test('handles numbers', () => {
    expect(typeCheck(0, Primitive.Number)).toEqual(true);
    expect(typeCheck(1, Primitive.Number)).toEqual(true);
    expect(typeCheck(false, Primitive.Number)).toEqual(false);
    expect(typeCheck(true, Primitive.Number)).toEqual(false);
    expect(typeCheck('test', Primitive.Number)).toEqual(false);
    expect(typeCheck([], Primitive.Number)).toEqual(false);
    expect(typeCheck({}, Primitive.Number)).toEqual(false);
    expect(typeCheck(null, Primitive.Number)).toEqual(false);
    expect(typeCheck(undefined, Primitive.Number)).toEqual(false);
  });

  test('handles array of numbers', () => {
    expect(typeCheck([0, 1], NonPrimitive.ListNumber)).toEqual(true);
    expect(typeCheck([0, 1, false], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, true], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, ''], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, 'test'], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, []], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, {}], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, null], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([0, 1, undefined], NonPrimitive.ListNumber)).toEqual(false);

    expect(typeCheck('', NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck('test', NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck(0, NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck(1, NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck(false, NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck(true, NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck([], NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck({}, NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck(null, NonPrimitive.ListNumber)).toEqual(false);
    expect(typeCheck(undefined, NonPrimitive.ListNumber)).toEqual(false);
  });

  test('handles strings', () => {
    expect(typeCheck('', Primitive.String)).toEqual(true);
    expect(typeCheck('test', Primitive.String)).toEqual(true);
    expect(typeCheck(0, Primitive.String)).toEqual(false);
    expect(typeCheck(1, Primitive.String)).toEqual(false);
    expect(typeCheck(false, Primitive.String)).toEqual(false);
    expect(typeCheck(true, Primitive.String)).toEqual(false);
    expect(typeCheck([], Primitive.String)).toEqual(false);
    expect(typeCheck({}, Primitive.String)).toEqual(false);
    expect(typeCheck(null, Primitive.String)).toEqual(false);
    expect(typeCheck(undefined, Primitive.String)).toEqual(false);
  });

  test('handles array of string', () => {
    expect(typeCheck(['', 'test'], NonPrimitive.ListString)).toEqual(true);
    expect(typeCheck(['', 'test', false], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', true], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', 0], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', 1], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', []], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', {}], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', null], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(['', 'test', undefined], NonPrimitive.ListString)).toEqual(false);

    expect(typeCheck('', NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck('test', NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(0, NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(1, NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(false, NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(true, NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck([], NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck({}, NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(null, NonPrimitive.ListString)).toEqual(false);
    expect(typeCheck(undefined, NonPrimitive.ListString)).toEqual(false);
  });

  test('handles array of multiple types (strings, numbers and booleans)', () => {
    expect(typeCheck(['', 'test', 0, 1, false, true, [], {}, null, undefined], NonPrimitive.ListAny)).toEqual(true);

    expect(typeCheck('', NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck('test', NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck(0, NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck(1, NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck(false, NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck(true, NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck([], NonPrimitive.ListAny)).toEqual(true);
    expect(typeCheck({}, NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck(null, NonPrimitive.ListAny)).toEqual(false);
    expect(typeCheck(undefined, NonPrimitive.ListAny)).toEqual(false);
  });

  test('handles objects', () => {
    expect(typeCheck({}, NonPrimitive.Object)).toEqual(true);
    expect(typeCheck('', NonPrimitive.Object)).toEqual(false);
    expect(typeCheck('test', NonPrimitive.Object)).toEqual(false);
    expect(typeCheck(0, NonPrimitive.Object)).toEqual(false);
    expect(typeCheck(1, NonPrimitive.Object)).toEqual(false);
    expect(typeCheck(false, NonPrimitive.Object)).toEqual(false);
    expect(typeCheck(true, NonPrimitive.Object)).toEqual(false);
    expect(typeCheck([], NonPrimitive.Object)).toEqual(false);
    expect(typeCheck(null, NonPrimitive.Object)).toEqual(false);
    expect(typeCheck(undefined, NonPrimitive.Object)).toEqual(false);
  });

  test('handles incorrect type', () => {
    // @ts-ignore
    expect(typeCheck(0, 'incorrectType')).toEqual(false);
  });
});
