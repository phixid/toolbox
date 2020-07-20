'use strict';
exports.__esModule = true;
exports.mockAddress = exports.mockAddressModel = void 0;
var ModelValidator_1 = require('../utils/validation/ModelValidator');
exports.mockAddressModel = [
  { key: 'street', required: true, type: ModelValidator_1.Primitives.String },
  { key: 'number', required: true, type: ModelValidator_1.Primitives.String },
  { key: 'postalCode', required: true, type: ModelValidator_1.Primitives.String },
  { key: 'city', required: true, type: ModelValidator_1.Primitives.String },
];
exports.mockAddress = {
  street: 'Random Street',
  number: '10',
  postalCode: '1000',
  city: 'Antwerp',
};
