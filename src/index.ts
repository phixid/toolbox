export enum DataType {
    Boolean = 'boolean',
    Number = 'number',
    String = 'string',
    GenericList = '[]',
    BooleanList = 'boolean[]',
    NumberList = 'number[]',
    StringList = 'string[]'
}
type DataModel = {
    [key: string]: {
        required?: boolean;
        type: DataType;
    };
};

export const Model = (model: DataModel) => ({
    validate: (obj: any) => {
        const hasRequiredProperties = Object.entries(model)
            .filter(([_, value]) => value && value.required)
            .reduce((acc, [requiredKey]) => {
                const isDefined = obj[requiredKey] !== undefined;

                return acc && isDefined;
            }, true);

        return {
            isValid: hasRequiredProperties,
        };
    },
});

export const typeCheck = (value: any, type: DataType) => {
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
