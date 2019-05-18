import test from 'ava';
import caesarSalad from '..';

import cryptTest from './helpers/crypt-test';

[
	{
		title: 'basic test',
		input: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		expected: 'PQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNO'
	},
	{
		title: 'lorem ipsum',
		input: 'The Quick Brown Fox Jumps Over The Lazy Dog',
		expected: '%96 "F:4< qC@H? u@I yF>AD ~G6C %96 {2KJ s@8'
	}
].forEach(task => {
	test(task.title + ' (encrypt)', cryptTest, Object.assign({}, task, {
		cipher: caesarSalad.ROT47.Cipher
	}));

	test(task.title + ' (decrypt)', cryptTest, Object.assign({}, task, {
		cipher: caesarSalad.ROT47.Decipher,
		input: task.expected,
		expected: task.input
	}));
});
