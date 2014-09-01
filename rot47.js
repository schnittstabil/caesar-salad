"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var ROT47 = function ROT47() {
  $traceurRuntime.defaultSuperCall(this, $ROT47.prototype, arguments);
};
var $ROT47 = ROT47;
($traceurRuntime.createClass)(ROT47, {_substituteCharCode: function(charCode) {
    if (charCode >= 33 && charCode <= 79) {
      return charCode + 47;
    }
    if (charCode >= 80 && charCode <= 126) {
      return charCode - 47;
    }
    return charCode;
  }}, {}, SubstitutionCipher);
ROT47.Cipher = function() {
  return new ROT47();
};
ROT47.Decipher = ROT47.Cipher;
ROT47['default'] = ROT47;
module.exports = ROT47;
