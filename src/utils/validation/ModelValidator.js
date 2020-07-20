'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
exports.__esModule = true;
exports.ModelValidator = exports.Primitives = void 0;
var Primitives;
(function (Primitives) {
  Primitives['Boolean'] = 'boolean';
  Primitives['Number'] = 'number';
  Primitives['String'] = 'string';
})((Primitives = exports.Primitives || (exports.Primitives = {})));
var ModelValidator = /** @class */ (function () {
  function ModelValidator(model, validators) {
    var _this = this;
    this.validate = function (obj) {
      _this.bootstrap();
      _this.validateRequiredProperties(obj);
      _this.validateCorrectPropertyTypes(obj);
      return {
        errors: _this.errors,
        isValid: _this.isValid,
      };
    };
    this.validateRequiredProperties = function (obj) {
      var requiredProperties = _this.model.filter(function (property) {
        return property.required;
      });
      return requiredProperties.forEach(function (requiredProperty) {
        var key = requiredProperty.key;
        if (obj[key] === undefined) {
          _this.invalidate();
          _this.addFormattedError('missing required property ' + key);
        }
      });
    };
    this.validateCorrectPropertyTypes = function (obj) {
      return _this.model.forEach(function (modelProperty) {
        var key = modelProperty.key,
          expectedType = modelProperty.type;
        var propertyValue = obj[key];
        var errorMessage =
          'expected ' + key + ' to have type ' + expectedType + ' but has type ' + typeof propertyValue;
        if (!_this.checkPropertyType(modelProperty, propertyValue)) {
          _this.invalidate();
          _this.addFormattedError(errorMessage);
        }
      });
    };
    this.checkPropertyType = function (modelProperty, propertyValue) {
      var required = modelProperty.required,
        type = modelProperty.type;
      var typeValidator = _this.validators[type];
      var hasCorrectType = typeValidator && typeValidator.validate(propertyValue);
      return required ? hasCorrectType : propertyValue === undefined || hasCorrectType;
    };
    this.invalidate = function () {
      _this.isValid = false;
    };
    this.addFormattedError = function (msg) {
      _this.errors = __spreadArrays(_this.errors, ['Model validation error: ' + msg]);
    };
    this.bootstrap = function () {
      _this.errors = [];
      _this.isValid = true;
    };
    this.errors = [];
    this.isValid = true;
    this.model = model;
    this.validators = validators;
  }
  return ModelValidator;
})();
exports.ModelValidator = ModelValidator;
