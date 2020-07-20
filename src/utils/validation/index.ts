export interface Validator {
  validate(value: any): boolean;
}

export { BooleanValidator } from './BooleanValidator';
export { NumberValidator } from './NumberValidator';
export { StringValidator } from './StringValidator';
