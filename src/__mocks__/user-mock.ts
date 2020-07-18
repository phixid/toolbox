import { mockAddress, mockAddressModel } from './address-mock';
import { NonPrimitive, Primitive } from '../utils/type-check';

export const mockUserModel = {
  firstname: { required: true, type: Primitive.String },
  lastname: { required: true, type: Primitive.String },
  email: { required: true, type: Primitive.String },
  phone: { type: Primitive.String },
};

export const mockUserWithAddressModel = {
  ...mockUserModel,
  address: {
    required: true,
    type: NonPrimitive.Object,
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
