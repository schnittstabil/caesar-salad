import CharBuffer from 'char-buffer';

/**
 * Abstract base class for substitution ciphers (and substitution deciphers).
 *
 * Substitution ciphers replace letters of plaintext by other letters. See {{#ext "Wikipedia" "en.wikipedia.org/wiki/Substitution_cipher"}}{{/ext}} for details.
 *
 * @class SubstitutionCipher
 */
class SubstitutionCipher {

  constructor() {
  }

  /**
   * Abstract method to substitute a single charCode.
   *
   * @method _substituteCharCode
   * @param input {number} The charCode to process.
   * @return {Number} The processed charCode.
   */
  _substituteCharCode() {
    throw Error('_substituteCharCode not implemented');
  }

  /**
   * Template method to encrypt/decrypt strings substituting its input charCode by charCode.
   *
   * @method crypt
   * @param input {String} The string to process.
   * @return {Number} The processed string.
   */
  crypt(input) {
    return CharBuffer.fromString(input,
      this._substituteCharCode, this).toString();
  }
}

/**
 * Abstract method to create a cipher instance.
 *
 * @method Cipher
 * @static
 * @return {SubstitutionCipher} The Cipher.
 */
SubstitutionCipher.Cipher = function() {
  throw Error('Cipher not implemented');
};

/**
 * Abstract method to create a decipher instance.
 *
 * @method Decipher
 * @static
 * @return {SubstitutionCipher} The Decipher.
 */
SubstitutionCipher.Decipher = function() {
  throw Error('Decipher not implemented');
};

// ES6-CommonJs interop:
SubstitutionCipher['default'] = SubstitutionCipher;

export default SubstitutionCipher;
