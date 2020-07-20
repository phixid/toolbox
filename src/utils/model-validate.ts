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
    this.validateRequiredProperties(obj);
    this.validateCorrectPropertyTypes(obj);

    return {
      errors: this.errors,
      isValid: this.isValid,
    };
  };

  private validateRequiredProperties = (obj: any): void => {
    const requiredProperties = this.model.filter((property) => property.required);
    return requiredProperties.forEach((requiredProperty) => {
      const { key } = requiredProperty;

      if (obj[key] === undefined) {
        this.invalidate();
        this.addFormattedError(`missing required property ${key}`);
      }
    });
  };

  private validateCorrectPropertyTypes = (obj: any): void => {
    return this.model.forEach((modelProperty) => {
      const { key, type: expectedType } = modelProperty;
      const propertyValue = obj[key];
      const errorMessage = `expected ${key} to have type ${expectedType} but has type ${typeof propertyValue}`;

      if (!this.checkPropertyType(modelProperty, propertyValue)) {
        this.invalidate();
        this.addFormattedError(errorMessage);
      }
    });
  };

  private checkPropertyType = (modelProperty: ModelProperty, propertyValue: any): boolean => {
    const { required, type } = modelProperty;
    const typeValidator = this.validators[type];
    const hasCorrectType = typeValidator && typeValidator.validate(propertyValue);

    return required ? hasCorrectType : propertyValue === undefined || hasCorrectType;
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
