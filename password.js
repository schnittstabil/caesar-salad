"use strict";
require('./polyfills');
function ShiftMixin() {
  this.shift = function() {
    return this.shiftArray()[0];
  };
  this.shiftArray = function() {
    var passwd = this.getPassword(),
        forDecryption = this.symbols.indexOf('forDecryption') + 1;
    passwd = passwd.map(function(num) {
      if (forDecryption) {
        return (26 - num) % 26;
      } else {
        return num % 26;
      }
    });
    if (passwd.length === 0) {
      return [0];
    }
    return passwd;
  };
}
function passwordToShiftArray(passwd) {
  var shiftArrayRegExp = /^[-+]?[0-9]+(,[-+]?[0-9]+)*$/,
      shiftStringRegExp = /^[A-Za-z]*$/;
  if (typeof passwd === 'undefined' || passwd === null) {
    return [0];
  }
  if (Number.isInteger(passwd)) {
    return [passwd];
  }
  if (typeof passwd === 'string' && shiftArrayRegExp.test(passwd)) {
    return passwd.split(',').map(Number);
  }
  if (typeof passwd === 'string' && shiftStringRegExp.test(passwd)) {
    return passwd.toLowerCase().split('').map(function(c) {
      return c.charCodeAt(0) - 97;
    });
  }
  if (passwd && passwd.every && passwd.every(Number.isInteger)) {
    return passwd.slice();
  }
  throw new RangeError('Unable to parse password: ' + passwd);
}
var dfa = {
  'password': ['to', 'forDecryption'],
  'to': [],
  'forDecryption': ['to']
};
var mixins = {'to': [ShiftMixin]};
var Password = (function() {
  function Password(passwd, symbol, parent) {
    if (!symbol) {
      symbol = 'password';
    }
    var children = dfa[symbol],
        i,
        len;
    if (parent instanceof Password) {
      this.symbols = parent.symbols.slice();
      this.getPassword = parent.getPassword;
    } else {
      this.symbols = [];
      passwd = passwordToShiftArray(passwd);
      this.getPassword = function() {
        return passwd;
      };
    }
    this.symbols.push(symbol);
    if (mixins[symbol]) {
      for (i = 0, len = mixins[symbol].length; i < len; i++) {
        mixins[symbol][i].call(this);
      }
    }
    for (i = 0; i < children.length; i++) {
      this[children[i]] = new Password(null, children[i], this);
    }
  }
  return ($traceurRuntime.createClass)(Password, {}, {});
}());
Password['default'] = Password;
module.exports = Password;
