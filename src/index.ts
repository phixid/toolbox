type Model = {
  [key: string]: {
    required?: boolean;
    type: DataType;
    model?: Model;
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
  Object = 'object',
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
type RequiredPropertiesReturnType = { errors: string[]; hasRequiredProperties: boolean };
const checkForRequiredProperties = (model: Model, obj: any): RequiredPropertiesReturnType => {
  // @ts-ignore
  return Object.entries(model)
    .filter(([_, value]) => value && value.required)
    .reduce(
      (acc: RequiredPropertiesReturnType, [requiredKey, requiredValue]) => {
        const errors: string[] = [...acc.errors];
        const isDefined = obj[requiredKey] !== undefined;
        if (!isDefined) errors.push(`Model validation error: missing required property ${requiredKey}`);

        const isNestedObject = requiredValue.type === DataType.Object && typeCheck(obj[requiredKey], DataType.Object);
        if (isNestedObject && requiredValue.model) {
          const {
            errors: nestedErrors,
            hasRequiredProperties: hasNestedRequiredProperties,
          } = checkForRequiredProperties(requiredValue.model, obj[requiredKey]);

          return {
            errors: [...errors, ...nestedErrors],
            hasRequiredProperties: acc.hasRequiredProperties && isDefined && hasNestedRequiredProperties,
          };
        }

        return {
          errors,
          hasRequiredProperties: acc.hasRequiredProperties && isDefined,
        };
      },
      {
        errors: [],
        hasRequiredProperties: true,
      }
    );
};

/**
 * Check if an objects properties match the types of a model
 * @param model
 * @param obj
 */
type MatchingPropertyTypesReturnType = { errors: string[]; hasMatchingPropertyTypes: boolean };
const checkForMatchingPropertyTypes = (model: Model, obj: any): MatchingPropertyTypesReturnType => {
  return Object.entries(model).reduce(
    (acc: MatchingPropertyTypesReturnType, [key, value]) => {
      const errors: string[] = [...acc.errors];
      const canBeUndefined = !value.required && obj[key] === undefined;
      const isMatchingPropertyType = typeCheck(obj[key], value.type);

      if (!canBeUndefined && !isMatchingPropertyType) {
        errors.push(`Model validation error: property ${key} has type ${typeof obj[key]} expected type ${value.type}`);
      }

      const isNestedObject = value.type === DataType.Object && typeCheck(obj[key], DataType.Object);
      if (isNestedObject && value.model) {
        const {
          errors: nestedErrors,
          hasMatchingPropertyTypes: hasNestedNestedMatchingPropertyTypes,
        } = checkForMatchingPropertyTypes(value.model, obj[key]);

        return {
          errors: [...errors, ...nestedErrors],
          hasMatchingPropertyTypes:
            acc.hasMatchingPropertyTypes &&
            (canBeUndefined || isMatchingPropertyType) &&
            hasNestedNestedMatchingPropertyTypes,
        };
      }

      return {
        errors,
        hasMatchingPropertyTypes: acc.hasMatchingPropertyTypes && (canBeUndefined || isMatchingPropertyType),
      };
    },
    {
      errors: [],
      hasMatchingPropertyTypes: true,
    }
  );
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
