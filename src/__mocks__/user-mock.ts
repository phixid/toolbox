import { mockAddress, mockAddressModel } from './address-mock';
import { DataType } from '../utils/type-check';

export const mockUserModel = {
  firstname: { required: true, type: DataType.String },
  lastname: { required: true, type: DataType.String },
  email: { required: true, type: DataType.String },
  phone: { type: DataType.String },
};

export const mockUserWithAddressModel = {
  ...mockUserModel,
  address: {
    required: true,
    type: DataType.Object,
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
