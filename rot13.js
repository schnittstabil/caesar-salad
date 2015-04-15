"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var ROT13 = (function($__super) {
  function ROT13() {
    $traceurRuntime.superConstructor(ROT13).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ROT13, {_substituteCharCode: function(charCode) {
      if (charCode >= 65 && charCode <= 77 || charCode >= 97 && charCode <= 109) {
        return charCode + 13;
      }
      if (charCode >= 78 && charCode <= 90 || charCode >= 110 && charCode <= 122) {
        return charCode - 13;
      }
      return charCode;
    }}, {}, $__super);
}(SubstitutionCipher));
ROT13.Cipher = function() {
  return new ROT13();
};
ROT13.Decipher = ROT13.Cipher;
ROT13['default'] = ROT13;
module.exports = ROT13;
