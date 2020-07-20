import { Validator } from './index';

export class BooleanValidator implements Validator {
  validate = (value: any): boolean => typeof value === 'boolean';
}
