export enum Primitive {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
}

export enum NonPrimitive {
  ListAny = '[]',
  ListBoolean = 'boolean[]',
  ListNumber = 'number[]',
  ListString = 'string[]',
  Object = 'object',
}

type ListPrimitive = NonPrimitive.ListBoolean | NonPrimitive.ListNumber | NonPrimitive.ListString;

class Datatype {
  static isPrimitive = (type: any): type is Primitive =>
    type === Primitive.Boolean || type === Primitive.Number || type === Primitive.String;

  static checkPrimitive(value: any, type: Primitive): boolean {
    return typeof value === type;
  }

  static isList = (type: any): type is NonPrimitive => Datatype.isListOfAny(type) || Datatype.isListOfPrimitives(type);
  static isListOfAny = (type: any): type is NonPrimitive.ListAny => type === NonPrimitive.ListAny;
  static isListOfPrimitives = (type: any): type is ListPrimitive =>
    type === NonPrimitive.ListBoolean || type === NonPrimitive.ListNumber || type === NonPrimitive.ListString;

  static checkList(value: any, type: NonPrimitive) {
    if (!Array.isArray(value)) return false;
    if (Datatype.isListOfAny(type)) return true;
    if (Datatype.isListOfPrimitives(type) && value.length < 1) return false;

    return value.length === value.filter((x: any) => type.startsWith(typeof x)).length;
  }

  static isObject = (type: any): type is NonPrimitive.Object => type === NonPrimitive.Object;

  static checkObject(value: any, type: NonPrimitive.Object) {
    if (value === null) return false;
    if (Array.isArray(value)) return false;
    return typeof value === type;
  }
}

/**
 * Check if a value is of a certain type
 * @param value
 * @param type
 */
export const typeCheck = (value: any, type: Primitive | NonPrimitive) => {
  if (Datatype.isPrimitive(type)) return Datatype.checkPrimitive(value, type);
  if (Datatype.isList(type)) return Datatype.checkList(value, type);
  if (Datatype.isObject(type)) return Datatype.checkObject(value, type);
  return false;
};
