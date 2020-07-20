import { Validator } from './index';

export class NumberValidator implements Validator {
  validate = (value: any): boolean => typeof value === 'number';
}
