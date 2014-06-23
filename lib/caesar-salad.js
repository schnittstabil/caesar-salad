import SubstitutionCipher from './substitution-cipher';
import Caesar from './caesar';
import ROT5 from './rot5';
import ROT13 from './rot13';
import ROT18 from './rot18';
import ROT47 from './rot47';
import Vigenere from './vigenere';

/**
 * @module caesar-salad
 * @main caesar-salad
 */

/**
 * Caesar-Salad Facade:
 *
 *     CaesarSalad.Caesar.Cipher('c').crypt('ABCD');   // returns: 'CDEF'
 *     CaesarSalad.Caesar.Decipher('c').crypt('CDEF'); // returns: 'ABCD'
 *
 * @class CaesarSalad
 */
var CaesarSalad = {};

/**
 * Names of supported ciphers (and deciphers).
 *
 * @property ciphers
 * @type {Array}
 * @default [ 'Caesar', 'ROT5', 'ROT13', 'ROT18', 'ROT47', 'Vigenere' ]
 */
CaesarSalad.ciphers = [
  Caesar.name,
  ROT5.name,
  ROT13.name,
  ROT18.name,
  ROT47.name,
  Vigenere.name
];

/**
 * @property SubstitutionCipher
 * @type SubstitutionCipher
 */
CaesarSalad.SubstitutionCipher = SubstitutionCipher;

/**
 * @property Caesar
 * @type Caesar
 */
CaesarSalad.Caesar = Caesar;

/**
 * @property ROT5
 * @type ROT5
 */
CaesarSalad.ROT5 = ROT5;

/**
 * @property ROT13
 * @type ROT13
 */
CaesarSalad.ROT13 = ROT13;

/**
 * @property ROT18
 * @type ROT18
 */
CaesarSalad.ROT18 = ROT18;

/**
 * @property ROT47
 * @type ROT47
 */
CaesarSalad.ROT47 = ROT47;

/**
 * @property Vigenere
 * @type Vigenere
 */
CaesarSalad.Vigenere = Vigenere;

// ES6-CommonJs interop:
CaesarSalad['default'] = CaesarSalad;

export default CaesarSalad;
