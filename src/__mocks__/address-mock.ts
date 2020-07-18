import { Primitive } from '../utils/type-check';

export const mockAddressModel = {
  street: { required: true, type: Primitive.String },
  number: { required: true, type: Primitive.String },
  postalCode: { required: true, type: Primitive.String },
  city: { required: true, type: Primitive.String },
};

export const mockAddress = {
  street: 'Random Street',
  number: '10',
  postalCode: '1000',
  city: 'Antwerp',
};
