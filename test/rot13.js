import test from 'ava';
import caesarSalad from '../';

import cryptTest from './helpers/crypt-test';

[
	{
		title: 'basic test',
		input: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		expected: '!"#$%&\'()*+,-./0123456789:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm{|}~'
	}
].forEach(task => {
	test(task.title + ' (encrypt)', cryptTest, Object.assign({}, task, {
		cipher: caesarSalad.ROT13.Cipher
	}));

	test(task.title + ' (decrypt)', cryptTest, Object.assign({}, task, {
		cipher: caesarSalad.ROT13.Decipher,
		input: task.expected,
		expected: task.input
	}));
});

