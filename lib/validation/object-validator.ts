import { Validator } from './validator';

export class ObjectValidator implements Validator {
  validate = (value: any): boolean => {
    if (value === null) return false;
    if (Array.isArray(value)) return false;
    return typeof value === 'object';
  };
}
