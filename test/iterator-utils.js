"use strict";
var $__4 = $traceurRuntime.initGeneratorFunction(charRange),
    $__5 = $traceurRuntime.initGeneratorFunction(appendIterators);
function charRange(startChar, endChar) {
  var begin,
      end,
      i;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          begin = startChar.charCodeAt(0), end = endChar.charCodeAt(0);
          $ctx.state = 9;
          break;
        case 9:
          i = begin;
          $ctx.state = 7;
          break;
        case 7:
          $ctx.state = (i <= end) ? 1 : -2;
          break;
        case 4:
          i++;
          $ctx.state = 7;
          break;
        case 1:
          $ctx.state = 2;
          return String.fromCharCode(i);
        case 2:
          $ctx.maybeThrow();
          $ctx.state = 4;
          break;
        default:
          return $ctx.end();
      }
  }, $__4, this);
}
module.exports.charRange = charRange;
function appendIterators() {
  var iterators,
      $__2,
      $__3,
      iterator,
      $__0,
      $__1,
      i;
  var $arguments = arguments;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          iterators = Array.prototype.slice.call($arguments);
          $ctx.state = 14;
          break;
        case 14:
          $__2 = iterators[Symbol.iterator]();
          $ctx.state = 7;
          break;
        case 7:
          $ctx.state = (!($__3 = $__2.next()).done) ? 9 : -2;
          break;
        case 9:
          iterator = $__3.value;
          $ctx.state = 10;
          break;
        case 10:
          $__0 = iterator[Symbol.iterator]();
          $ctx.state = 4;
          break;
        case 4:
          $ctx.state = (!($__1 = $__0.next()).done) ? 5 : 7;
          break;
        case 5:
          i = $__1.value;
          $ctx.state = 6;
          break;
        case 6:
          $ctx.state = 2;
          return i;
        case 2:
          $ctx.maybeThrow();
          $ctx.state = 4;
          break;
        default:
          return $ctx.end();
      }
  }, $__5, this);
}
module.exports.appendIterators = appendIterators;
function toString(iterator) {
  var buffer = '';
  for (var $__0 = iterator[Symbol.iterator](),
      $__1; !($__1 = $__0.next()).done; ) {
    var i = $__1.value;
    {
      buffer += i;
    }
  }
  return buffer;
}
module.exports.toString = toString;
