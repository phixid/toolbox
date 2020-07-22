import { Validator } from './validator';

export class BooleanValidator implements Validator {
  validate = (value: any): boolean => typeof value === 'boolean';
}
