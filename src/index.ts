export type ModelType = {
    [key: string]: {
        required?: boolean;
        type: BasicType | GenericListType | ListOfBasicType;
    };
};

// TODO: type model
export const Model = {
    validate: (model: ModelType, obj: any) => {
        const hasRequiredProperties = Object.entries(model)
            .filter(([key, value]) => value && value.required)
            .reduce((acc, [requiredKey, requiredValue]) => {
                const isDefined = obj[requiredKey] !== undefined;

                return acc && isDefined;
            }, true);

        return {
            isValid: hasRequiredProperties,
        };
    },
};

type BasicType = 'boolean' | 'number' | 'string';
type GenericListType = '[]';
type ListOfBasicType = 'boolean[]' | 'number[]' | 'string[]';

export const typeCheck = (value: any, type: BasicType | GenericListType | ListOfBasicType) => {
    const isBasicType = type === 'boolean' || type === 'number' || type === 'string';
    const isGenericListType = type === '[]';
    const isListOfBasicType = type === 'boolean[]' || type === 'number[]' || type === 'string[]';

    if (isBasicType) return typeof value === type;
    if (isGenericListType || isListOfBasicType) {
        if (!Array.isArray(value)) return false;
        if (isListOfBasicType && value.length < 1) return false;
        if (isGenericListType) return true;

        return value.length === value.filter((x: any) => type.startsWith(typeof x)).length;
    }

    return false;
};
