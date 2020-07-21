import { Validator } from './index';

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
  private readonly validators: { [key: string]: Validator };

  constructor(model: Model, validators: { [key: string]: Validator }) {
    this.errors = [];
    this.isValid = true;
    this.model = model;
    this.validators = validators;
  }

  public validate = (obj: any): ModelValidatorResult => {
    this.bootstrap();
    this.validateRequiredProperties(obj);
    this.validatePropertyTypes(obj);
    this.validateNestedModels(obj);

    return {
      errors: this.errors,
      isValid: this.isValid,
    };
  };

  private validateNestedModels = (obj: any) => {
    const nestedModels = this.model.filter((property) => property.type === NonPrimitives.Object);
    nestedModels.forEach((nestedModel) => {
      const { key, model } = nestedModel;

      if (model && key) {
        const nestedObj = obj[key];
        const validator = new ModelValidator(model, this.validators);
        const { errors } = validator.validate(nestedObj);
        errors.forEach(this.invalidate);
      } else {
        this.invalidate(`nested model ${key} does not have an assigned model`);
      }
    });
  };

  private validateRequiredProperties = (obj: any): void => {
    const requiredProperties = this.model.filter((property) => property.required);
    return requiredProperties.forEach((requiredProperty) => {
      const { key } = requiredProperty;

      if (obj[key] === undefined) {
        this.invalidate(`missing required property ${key}`);
      }
    });
  };

  private validatePropertyTypes = (obj: any): void => {
    return this.model.forEach((modelProperty) => {
      const { key, type: expectedType } = modelProperty;
      const typeValidator = this.validators[expectedType];
      const propertyValue = obj[key];
      const hasCorrectType = typeValidator && typeValidator.validate(propertyValue);

      if (propertyValue !== undefined && !hasCorrectType) {
        const errorMessage = `expected ${key} to have type ${expectedType} but has type ${typeof propertyValue}`;
        this.invalidate(errorMessage);
      }
    });
  };

  private invalidate = (msg: string): void => {
    const errorPrefix = 'Model validation error:';
    const errorMsg = msg.startsWith(errorPrefix) ? msg : `${errorPrefix} ${msg}`;

    this.isValid = false;
    this.errors = [...this.errors, errorMsg];
  };

  private bootstrap = () => {
    this.errors = [];
    this.isValid = true;
  };
}
