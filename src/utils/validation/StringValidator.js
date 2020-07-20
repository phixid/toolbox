'use strict';
exports.__esModule = true;
exports.StringValidator = void 0;
var StringValidator = /** @class */ (function () {
  function StringValidator() {
    this.validate = function (value) {
      return typeof value === 'string';
    };
  }
  return StringValidator;
})();
exports.StringValidator = StringValidator;
