import { mockAddress, mockAddressModel } from './address-mock';
import { TypeValidation } from '../utils/type-check';
import NonPrimitives = TypeValidation.NonPrimitives;
import Primitives = TypeValidation.Primitives;

export const mockUserModel = {
  firstname: { required: true, type: Primitives.String },
  lastname: { required: true, type: Primitives.String },
  email: { required: true, type: Primitives.String },
  phone: { type: Primitives.String },
};

export const mockUserWithAddressModel = {
  ...mockUserModel,
  address: {
    required: true,
    type: NonPrimitives.Object,
    model: mockAddressModel,
  },
};

export const mockUser = {
  firstname: 'Kristof',
  lastname: 'Hermans',
  email: 'kristof.hermans@golden-giraffes.be',
};

export const mockUserWithAddress = {
  ...mockUser,
  address: mockAddress,
};
