"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var ROT5 = (function($__super) {
  function ROT5() {
    $traceurRuntime.superConstructor(ROT5).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ROT5, {_substituteCharCode: function(charCode) {
      if (charCode >= 48 && charCode <= 52) {
        return charCode + 5;
      }
      if (charCode >= 53 && charCode <= 57) {
        return charCode - 5;
      }
      return charCode;
    }}, {}, $__super);
}(SubstitutionCipher));
ROT5.Cipher = function() {
  return new ROT5();
};
ROT5.Decipher = ROT5.Cipher;
ROT5['default'] = ROT5;
module.exports = ROT5;
