'use strict';
exports.__esModule = true;
exports.BooleanValidator = void 0;
var BooleanValidator = /** @class */ (function () {
  function BooleanValidator() {
    this.validate = function (value) {
      return typeof value === 'boolean';
    };
  }
  return BooleanValidator;
})();
exports.BooleanValidator = BooleanValidator;
