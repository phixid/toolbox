import { Validator } from './validator';

export enum NonPrimitives {
  Object = 'object',
}

export enum Primitives {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
}

type ModelProperty = {
  key: string;
  model?: Model;
  required?: boolean;
  type: NonPrimitives | Primitives;
};

type Model = ModelProperty[];

type ModelValidatorResult = {
  errors: string[];
  isValid: boolean;
};

export class ModelValidator {
  private errors: string[];
  private isValid: boolean;
  private model: Model;
  private readonly typeValidators: { [key: string]: Validator };

  constructor(model: Model, typeValidators: { [key: string]: Validator }) {
    this.errors = [];
    this.isValid = true;
    this.model = model;
    this.typeValidators = typeValidators;
  }

  public validate = (obj: any): ModelValidatorResult => {
    this.bootstrap();
    this.validateRequiredProperties(obj);
    if (this.isValid) this.validatePropertyTypes(obj);
    if (this.isValid) this.validateNestedModels(obj);

    return {
      errors: this.errors,
      isValid: this.isValid,
    };
  };

  private validateNestedModels = (obj: any) => {
    const nestedModels = this.model.filter((property) => property.type === NonPrimitives.Object);
    nestedModels.forEach((nestedModel) => {
      const { key, model } = nestedModel;
      if (!model) return this.invalidate(`missing nested model for key ${key}`);
      const nestedObj = obj[key];
      const validator = new ModelValidator(model, this.typeValidators);
      const { errors } = validator.validate(nestedObj);
      errors.forEach(this.invalidate);
    });
  };

  private validateRequiredProperties = (obj: any): void => {
    const requiredProperties = this.model.filter((property) => property.required);
    return requiredProperties.forEach((requiredProperty) => {
      const { key } = requiredProperty;

      if (obj[key] === undefined) this.invalidate(`missing required property ${key}`);
    });
  };

  private validatePropertyTypes = (obj: any): void => {
    return this.model.forEach((modelProperty) => {
      const { key, type: expectedType } = modelProperty;
      const typeValidator = this.getValidatorForType(expectedType);
      const objectProperty = obj[key];

      if (!typeValidator) return this.invalidate(`missing validator for type ${expectedType}`);
      if (this.hasInvalidType(objectProperty, typeValidator)) {
        this.invalidate(`expected ${key} to have type ${expectedType} but has type ${typeof objectProperty}`);
      }
    });
  };

  private getValidatorForType = (type: NonPrimitives | Primitives): Validator | null => {
    return this.typeValidators[type] || null;
  };

  private hasInvalidType = (objectProperty: any, validator: Validator): boolean => {
    const hasIncorrectType = !validator.validate(objectProperty);
    const isDefined = objectProperty !== undefined;
    return hasIncorrectType && isDefined;
  };

  private invalidate = (msg: string): void => {
    const errorPrefix = 'Model validation error:';
    const errorMsg = msg.startsWith(errorPrefix) ? msg : `${errorPrefix} ${msg}`;

    this.isValid = false;
    this.errors = this.errors.includes(errorMsg) ? this.errors : [...this.errors, errorMsg];
  };

  private bootstrap = () => {
    this.errors = [];
    this.isValid = true;
  };
}
