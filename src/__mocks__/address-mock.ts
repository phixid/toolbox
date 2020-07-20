import { Primitives } from '../utils/model-validate';

export const mockAddressModel = [
  { key: 'street', required: true, type: Primitives.String },
  { key: 'number', required: true, type: Primitives.String },
  { key: 'postalCode', required: true, type: Primitives.String },
  { key: 'city', required: true, type: Primitives.String },
];

export const mockAddress = {
  street: 'Random Street',
  number: '10',
  postalCode: '1000',
  city: 'Antwerp',
};
