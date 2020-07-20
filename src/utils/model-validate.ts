import { Validator } from './validation';

export enum Primitives {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
}

type ModelProperty = {
  key: string;
  required?: boolean;
  type: Primitives;
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
    this.checkRequiredProperties(obj);
    this.checkPropertyTypes(obj);

    return {
      errors: this.errors,
      isValid: this.isValid,
    };
  };

  private checkRequiredProperties = (obj: any): void => {
    const requiredProperties = this.model.filter((property) => property.required);
    return requiredProperties.forEach((requiredProperty) => {
      const { key } = requiredProperty;

      if (obj?.[key] === undefined) {
        this.invalidate();
        this.addFormattedError(`missing required property ${key}`);
      }
    });
  };

  private checkPropertyTypes = (obj: any): void => {
    return this.model.forEach((property) => {
      const { key, required, type: expectedType } = property;
      const validator = this.validators[expectedType];
      const value = obj?.[key];
      const canBeUndefined = !required && value === undefined;

      if (!canBeUndefined) {
        if (!validator.validate(value)) {
          this.invalidate();
          this.addFormattedError(`expected ${key} to have type ${expectedType} but has type ${typeof value}`);
        }
      }
    });
  };

  private invalidate = (): void => {
    this.isValid = false;
  };

  private addFormattedError = (msg: string): void => {
    this.errors = [...this.errors, `Model validation error: ${msg}`];
  };

  private bootstrap = () => {
    this.errors = [];
    this.isValid = true;
  };
}
