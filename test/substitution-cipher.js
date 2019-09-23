import test from 'ava';

import SubstitutionCipher from '../substitution-cipher';

test('_substituteCharCode should throw an error', t => {
	const cipher = new SubstitutionCipher();

	t.throws(() => cipher._substituteCharCode(97), /not implemented/);
});

test('Cipher should throw an error', t => {
	const cipher = SubstitutionCipher.Cipher;

	t.throws(() => cipher(), /not implemented/);
});

test('Decipher should throw an error', t => {
	const cipher = SubstitutionCipher.Decipher;

	t.throws(() => cipher(), /not implemented/);
});
