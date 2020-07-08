import { DataType } from '../index';

export const mockAddressModel = {
  street: { required: true, type: DataType.String },
  number: { required: true, type: DataType.String },
  postalCode: { required: true, type: DataType.String },
  city: { required: true, type: DataType.String },
};

export const mockAddress = {
  street: 'Random Street',
  number: '10',
  postalCode: '1000',
  city: 'Antwerp',
};
