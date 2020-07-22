import { Validator } from './validator';

export class NumberValidator implements Validator {
  validate = (value: any): boolean => typeof value === 'number';
}
