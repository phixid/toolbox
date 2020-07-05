export enum DataType {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  GenericList = '[]',
  BooleanList = 'boolean[]',
  NumberList = 'number[]',
  StringList = 'string[]',
}
type DataModel = {
  [key: string]: {
    required?: boolean;
    type: DataType;
  };
};

export const Model = (model: DataModel) => ({
  validate: async (obj: any) => {
    const errors: string[] = [];

    const hasRequiredProperties = Object.entries(model)
      .filter(([_, value]) => value && value.required)
      .reduce((acc, [requiredKey]) => {
        const isDefined = obj[requiredKey] !== undefined;
        if (!isDefined) errors.push(`Model validation error: missing required property ${requiredKey}`);

        return acc && isDefined;
      }, true);

    const hasMatchingPropertyTypes = Object.entries(model).reduce((acc, [key, value]) => {
      const canBeUndefined = !value.required && obj[key] === undefined;
      const isMatchingPropertyType = typeCheck(obj[key], value.type);

      if (!canBeUndefined && !isMatchingPropertyType) {
        errors.push(
          `Model validation error: property firstname has type ${typeof obj[key]} expected type ${value.type}`
        );
      }

      return acc && (canBeUndefined || isMatchingPropertyType);
    }, true);

    return {
      errors: errors.length ? errors : null,
      isValid: hasRequiredProperties && hasMatchingPropertyTypes,
    };
  },
});

export const typeCheck = (value: any, type: DataType) => {
  const isBasicType = type === DataType.Boolean || type === DataType.Number || type === DataType.String;
  const isGenericListType = type === DataType.GenericList;
  const isListOfBasicType =
    type === DataType.BooleanList || type === DataType.NumberList || type === DataType.StringList;

  if (isBasicType) return typeof value === type;
  if (isGenericListType || isListOfBasicType) {
    if (!Array.isArray(value)) return false;
    if (isListOfBasicType && value.length < 1) return false;
    if (isGenericListType) return true;

    return value.length === value.filter((x: any) => type.startsWith(typeof x)).length;
  }

  return false;
};
