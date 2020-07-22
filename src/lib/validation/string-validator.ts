import { Validator } from './index';

export class StringValidator implements Validator {
  validate = (value: any): boolean => typeof value === 'string';
}
