export interface Validator {
  validate(value: any): boolean;
}

export { BooleanValidator } from './boolean-validator';
export { ModelValidator } from './model-validator';
export { NumberValidator } from './number-validator';
export { ObjectValidator } from './object-validator';
export { StringValidator } from './string-validator';
