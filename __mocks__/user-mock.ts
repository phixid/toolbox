import { mockAddress, mockAddressModel } from './address-mock';
import { NonPrimitives, Primitives } from '../lib/validation/model-validator';

export const mockUserModel = [
  { key: 'firstname', required: true, type: Primitives.String },
  { key: 'lastname', required: true, type: Primitives.String },
  { key: 'email', required: true, type: Primitives.String },
  { key: 'phone', type: Primitives.String },
  { key: 'height', required: true, type: Primitives.Number },
  { key: 'married', required: true, type: Primitives.Boolean },
];

export const mockUserWithAddressModel = [
  ...mockUserModel,
  { key: 'address', required: true, type: NonPrimitives.Object, model: mockAddressModel },
];

export const invalidMockUserWithAddressModel = [
  ...mockUserModel,
  { key: 'address', required: true, type: NonPrimitives.Object },
];

export const mockUser = {
  firstname: 'Kristof',
  lastname: 'Hermans',
  email: 'kristof.hermans@golden-giraffes.be',
  height: 186,
  married: false,
};

export const mockUserWithAddress = {
  ...mockUser,
  address: mockAddress,
};
