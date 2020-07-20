'use strict';
exports.__esModule = true;
exports.NumberValidator = void 0;
var NumberValidator = /** @class */ (function () {
  function NumberValidator() {
    this.validate = function (value) {
      return typeof value === 'number';
    };
  }
  return NumberValidator;
})();
exports.NumberValidator = NumberValidator;
