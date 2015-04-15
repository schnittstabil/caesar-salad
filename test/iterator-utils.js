"use strict";
var $__14 = $traceurRuntime.initGeneratorFunction(charRange),
    $__15 = $traceurRuntime.initGeneratorFunction(appendIterators);
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
  }, $__14, this);
}
module.exports.charRange = charRange;
function appendIterators() {
  var iterators,
      $__10,
      $__11,
      $__12,
      $__8,
      $__7,
      iterator,
      $__3,
      $__4,
      $__5,
      $__1,
      $__0,
      i,
      $__6,
      $__13;
  var $arguments = arguments;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          iterators = Array.prototype.slice.call($arguments);
          $__10 = true;
          $__11 = false;
          $__12 = undefined;
          $ctx.state = 44;
          break;
        case 44:
          $ctx.pushTry(30, 31);
          $ctx.state = 33;
          break;
        case 33:
          $__8 = void 0, $__7 = (iterators)[$traceurRuntime.toProperty(Symbol.iterator)]();
          $ctx.state = 29;
          break;
        case 29:
          $ctx.state = (!($__10 = ($__8 = $__7.next()).done)) ? 25 : 27;
          break;
        case 15:
          $__10 = true;
          $ctx.state = 29;
          break;
        case 25:
          iterator = $__8.value;
          $ctx.state = 26;
          break;
        case 26:
          $__3 = true;
          $__4 = false;
          $__5 = undefined;
          $ctx.state = 24;
          break;
        case 24:
          $ctx.pushTry(10, 11);
          $ctx.state = 13;
          break;
        case 13:
          $__1 = void 0, $__0 = (iterator)[$traceurRuntime.toProperty(Symbol.iterator)]();
          $ctx.state = 9;
          break;
        case 9:
          $ctx.state = (!($__3 = ($__1 = $__0.next()).done)) ? 5 : 7;
          break;
        case 4:
          $__3 = true;
          $ctx.state = 9;
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
        case 7:
          $ctx.popTry();
          $ctx.state = 11;
          $ctx.finallyFallThrough = 15;
          break;
        case 10:
          $ctx.popTry();
          $ctx.maybeUncatchable();
          $__6 = $ctx.storedException;
          $ctx.state = 16;
          break;
        case 16:
          $__4 = true;
          $__5 = $__6;
          $ctx.state = 11;
          $ctx.finallyFallThrough = 15;
          break;
        case 11:
          $ctx.popTry();
          $ctx.state = 22;
          break;
        case 22:
          try {
            if (!$__3 && $__0.return != null) {
              $__0.return();
            }
          } finally {
            if ($__4) {
              throw $__5;
            }
          }
          $ctx.state = 20;
          break;
        case 27:
          $ctx.popTry();
          $ctx.state = 31;
          $ctx.finallyFallThrough = -2;
          break;
        case 30:
          $ctx.popTry();
          $ctx.maybeUncatchable();
          $__13 = $ctx.storedException;
          $ctx.state = 36;
          break;
        case 36:
          $__11 = true;
          $__12 = $__13;
          $ctx.state = 31;
          $ctx.finallyFallThrough = -2;
          break;
        case 31:
          $ctx.popTry();
          $ctx.state = 42;
          break;
        case 42:
          try {
            if (!$__10 && $__7.return != null) {
              $__7.return();
            }
          } finally {
            if ($__11) {
              throw $__12;
            }
          }
          $ctx.state = 40;
          break;
        case 40:
          $ctx.state = $ctx.finallyFallThrough;
          break;
        case 20:
          switch ($ctx.finallyFallThrough) {
            case 44:
            case 33:
            case 29:
            case 15:
            case 25:
            case 26:
            case 24:
            case 13:
            case 9:
            case 4:
            case 5:
            case 6:
            case 2:
            case 7:
            case 10:
            case 16:
            case 11:
            case 22:
            case 20:
            case 27:
            case 30:
            case 36:
              $ctx.state = $ctx.finallyFallThrough;
              $ctx.finallyFallThrough = -1;
              break;
            default:
              $ctx.state = 31;
              break;
          }
          break;
        default:
          return $ctx.end();
      }
  }, $__15, this);
}
module.exports.appendIterators = appendIterators;
function toString(iterator) {
  var buffer = '';
  var $__3 = true;
  var $__4 = false;
  var $__5 = undefined;
  try {
    for (var $__1 = void 0,
        $__0 = (iterator)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
      var i = $__1.value;
      {
        buffer += i;
      }
    }
  } catch ($__6) {
    $__4 = true;
    $__5 = $__6;
  } finally {
    try {
      if (!$__3 && $__0.return != null) {
        $__0.return();
      }
    } finally {
      if ($__4) {
        throw $__5;
      }
    }
  }
  return buffer;
}
module.exports.toString = toString;
