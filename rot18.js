"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var ROT5 = require('./rot5');
var ROT13 = require('./rot13');
var ROT18 = function ROT18() {
  $traceurRuntime.defaultSuperCall(this, $ROT18.prototype, arguments);
};
var $ROT18 = ROT18;
($traceurRuntime.createClass)(ROT18, {_substituteCharCode: function(charCode) {
    charCode = ROT5.prototype._substituteCharCode(charCode);
    charCode = ROT13.prototype._substituteCharCode(charCode);
    return charCode;
  }}, {}, SubstitutionCipher);
ROT18.Cipher = function() {
  return new ROT18();
};
ROT18.Decipher = ROT18.Cipher;
ROT18['default'] = ROT18;
module.exports = ROT18;
