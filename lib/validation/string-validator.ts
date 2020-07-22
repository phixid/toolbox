import { Validator } from './validator';

export class StringValidator implements Validator {
  validate = (value: any): boolean => typeof value === 'string';
}
