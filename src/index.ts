type Model = {
  [key: string]: {
    required?: boolean;
    type: DataType;
  };
};

export enum DataType {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  GenericList = '[]',
  BooleanList = 'boolean[]',
  NumberList = 'number[]',
  StringList = 'string[]',
}

export const DataModel = (model: Model) => ({
  validate: async (obj: any) => {
    if (!obj || typeof obj !== 'object') {
      const error =
        typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'string'
          ? `Model validation error: obj is of type ${typeof obj}`
          : `Model validation error: obj is ${obj}`;

      return {
        errors: [error],
        isValid: false,
      };
    }

    const { errors: requiredPropertyErrors, hasRequiredProperties } = checkForRequiredProperties(model, obj);
    const { errors: matchingPropertyTypeErrors, hasMatchingPropertyTypes } = checkForMatchingPropertyTypes(model, obj);
    const aggregateErrors = [...requiredPropertyErrors, ...matchingPropertyTypeErrors];

    return {
      errors: aggregateErrors.length ? aggregateErrors : null,
      isValid: hasRequiredProperties && hasMatchingPropertyTypes,
    };
  },
});

/**
 * Check if an object has the required properties of a model
 * @param model
 * @param obj
 */
const checkForRequiredProperties = (model: Model, obj: any) => {
  const errors: string[] = [];
  const hasRequiredProperties = Object.entries(model)
    .filter(([_, value]) => value && value.required)
    .reduce((acc, [requiredKey]) => {
      const isDefined = obj[requiredKey] !== undefined;
      if (!isDefined) errors.push(`Model validation error: missing required property ${requiredKey}`);

      return acc && isDefined;
    }, true);

  return {
    errors,
    hasRequiredProperties,
  };
};

/**
 * Check if an objects properties match the types of a model
 * @param model
 * @param obj
 */
const checkForMatchingPropertyTypes = (model: Model, obj: any) => {
  const errors: string[] = [];
  const hasMatchingPropertyTypes = Object.entries(model).reduce((acc, [key, value]) => {
    const canBeUndefined = !value.required && obj[key] === undefined;
    const isMatchingPropertyType = typeCheck(obj[key], value.type);

    if (!canBeUndefined && !isMatchingPropertyType) {
      errors.push(`Model validation error: property firstname has type ${typeof obj[key]} expected type ${value.type}`);
    }

    return acc && (canBeUndefined || isMatchingPropertyType);
  }, true);

  return {
    errors,
    hasMatchingPropertyTypes,
  };
};

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

  if (isBasicType) return typeof value === type;
  if (isGenericListType || isListOfBasicType) {
    if (!Array.isArray(value)) return false;
    if (isListOfBasicType && value.length < 1) return false;
    if (isGenericListType) return true;

    return value.length === value.filter((x: any) => type.startsWith(typeof x)).length;
  }

  return false;
};
