import { mockAddress, mockAddressModel } from './address-mock';
import { Primitives } from '../utils/model-validate';

export const mockUserModel = [
  { key: 'firstname', required: true, type: Primitives.String },
  { key: 'lastname', required: true, type: Primitives.String },
  { key: 'email', required: true, type: Primitives.String },
  { key: 'phone', type: Primitives.String },
];

export const mockUserWithAddressModel = [
  ...mockUserModel,
  { key: 'address', required: true, type: 'object', model: mockAddressModel },
];

export const mockUser = {
  firstname: 'Kristof',
  lastname: 'Hermans',
  email: 'kristof.hermans@golden-giraffes.be',
};

export const mockUserWithAddress = {
  ...mockUser,
  address: mockAddress,
};
