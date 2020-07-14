export enum DataType {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  GenericList = '[]',
  BooleanList = 'boolean[]',
  NumberList = 'number[]',
  StringList = 'string[]',
  Object = 'object',
}

/**
 * Check if a value is of a certain type
 * @param value
 * @param type
 */
export const typeCheck = (value: any, type: DataType) => {
  const isBasicType = type === DataType.Boolean || type === DataType.Number || type === DataType.String;
  const isGenericListType = type === DataType.GenericList;
  const isListOfBasicType =
    type === DataType.BooleanList || type === DataType.NumberList || type === DataType.StringList;
  const isObjectType = type === DataType.Object;

  if (isBasicType) return typeof value === type;
  if (isGenericListType || isListOfBasicType) {
    if (!Array.isArray(value)) return false;
    if (isListOfBasicType && value.length < 1) return false;
    if (isGenericListType) return true;

    return value.length === value.filter((x: any) => type.startsWith(typeof x)).length;
  }
  if (isObjectType) {
    if (value === null) return false;
    if (Array.isArray(value)) return false;
    return typeof value === type;
  }

  return false;
};
