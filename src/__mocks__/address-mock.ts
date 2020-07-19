import { Primitives } from '../utils/type-check';

export const mockAddressModel = {
  street: { required: true, type: Primitives.String },
  number: { required: true, type: Primitives.String },
  postalCode: { required: true, type: Primitives.String },
  city: { required: true, type: Primitives.String },
};

export const mockAddress = {
  street: 'Random Street',
  number: '10',
  postalCode: '1000',
  city: 'Antwerp',
};
