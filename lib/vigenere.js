import SubstitutionCipher from './substitution-cipher';
import Caesar from './caesar';
import Password from './password';

class Vigenere extends SubstitutionCipher {
  /**
   * The _Vigenere Cipher_ is a polylphabetic substitution cipher rotating `A..Z` and `a..z` characters:
   *
   * Examples using static factory methods:
   *
   *     Vigenere.Cipher('abc').crypt('ABAB');   // returns: 'ACCB'
   *
   *     var cipher = Vigenere.Cipher('abc');
   *     cipher.crypt('AB');                     // returns: 'AC'
   *     cipher.crypt('AB');                     // returns: 'CB'
   *
   *     Vigenere.Decipher('abc').crypt('ACCB'); // returns 'ABAB'
   *
   * Examples using constructors:
   *
   *     new Vigenere([0, 1, 2]).crypt('ABAB');  // returns: 'ACCB'
   *     new Vigenere([0,-1,-2]).crypt('ACCB');  // returns: 'ABAB'
   *     new Vigenere([0,25,24]).crypt('ACCB');  // returns: 'ABAB'
   *
   * See {{#ext "Wikipedia" "en.wikipedia.org/wiki/Vigenere_cipher"}}{{/ext}} for details.
   *
   * @class Vigenere
   * @extends SubstitutionCipher
   * @constructor
   * @param shiftArray {[Number]} The array of numbers used to rotate the charCodes `mod 26` and therefore the password of the Vigenere Cipher.
   */
  constructor(shiftArray) {
    super();

    this._shiftArray = shiftArray.map(function(shift){
      return ((shift % 26) + 26) % 26;
    });

    this._shiftIndex = -1;

    /**
     * Substitutes only charCodes of `A..Z` and `a..z` characters.
     *
     * @protected
     * @method _substituteCharCode
     * @param charCode {Number} the charCode to substitute.
     * @return {Number} The substituted charCode.
     */
    this._substituteCharCode = Caesar.prototype._substituteCharCode;
  }

  /**
   * Return the rotated charCode.
   *
   * @protected
   * @method _rotate
   * @param charCode {Number} the charCode to rotate
   * @return {Number} `(charCode + shift) % 26`
   */
  _rotate(charCode) {
    this._shiftIndex = (this._shiftIndex + 1) % this._shiftArray.length;

    return (charCode + this._shiftArray[this._shiftIndex]) % 26;
  }
}

/**
 * Static factory method to create cipher instances.
 *
 * @method Cipher
 * @static
 * @param password {[Number]|String} The password to use, see {{#crossLink "Password"}}{{/crossLink}} for valid formats.
 * @return {Vigenere} The Cipher.
 */
Vigenere.Cipher = function(password) {
  return new Vigenere(new Password(password).to.shiftArray());
};

/**
 * Static factory method to create decipher instances.
 *
 * @method Decipher
 * @static
 * @param password {[Number]|String} The password to use, see {{#crossLink "Password"}}{{/crossLink}} for valid formats.
 * @return {Vigenere} The Decipher.
 */
Vigenere.Decipher = function(password) {
  return new Vigenere(new Password(password).forDecryption.to.shiftArray());
};

// ES6-CommonJs interop:
Vigenere['default'] = Vigenere;

export default Vigenere;
