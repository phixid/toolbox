import { DataType, Model } from '../index';

const mockUserModelConfig = {
  firstname: { required: true, type: DataType.String },
  lastname: { required: true, type: DataType.String },
  email: { required: true, type: DataType.String },
  phone: { type: DataType.String },
};

export const mockUser = {
  firstname: 'Kristof',
  lastname: 'Hermans',
  email: 'kristof.hermans@golden-giraffes.be',
};

export const mockUserModel = Model(mockUserModelConfig);
