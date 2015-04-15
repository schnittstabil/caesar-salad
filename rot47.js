"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var ROT47 = (function($__super) {
  function ROT47() {
    $traceurRuntime.superConstructor(ROT47).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ROT47, {_substituteCharCode: function(charCode) {
      if (charCode >= 33 && charCode <= 79) {
        return charCode + 47;
      }
      if (charCode >= 80 && charCode <= 126) {
        return charCode - 47;
      }
      return charCode;
    }}, {}, $__super);
}(SubstitutionCipher));
ROT47.Cipher = function() {
  return new ROT47();
};
ROT47.Decipher = ROT47.Cipher;
ROT47['default'] = ROT47;
module.exports = ROT47;
