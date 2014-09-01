"use strict";
var CharBuffer = require('char-buffer');
var SubstitutionCipher = function SubstitutionCipher() {};
($traceurRuntime.createClass)(SubstitutionCipher, {
  _substituteCharCode: function() {
    throw Error('_substituteCharCode not implemented');
  },
  crypt: function(input) {
    return CharBuffer.fromString(input, this._substituteCharCode, this).toString();
  }
}, {});
SubstitutionCipher.Cipher = function() {
  throw Error('Cipher not implemented');
};
SubstitutionCipher.Decipher = function() {
  throw Error('Decipher not implemented');
};
SubstitutionCipher['default'] = SubstitutionCipher;
module.exports = SubstitutionCipher;
