'use strict';
exports.__esModule = true;
exports.range = void 0;
exports.range = function (x, y) {
  var arrayLength = y === undefined ? Math.abs(x) : Math.abs(y - x);
  var nonIterableArray = Array(arrayLength);
  var iterableArray = Array.from(nonIterableArray);
  return iterableArray.map(function (element, index) {
    if (y === undefined) return x > 0 ? index : 0 - index;
    return y > x ? index + x : x - index;
  });
};
