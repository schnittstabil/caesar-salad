import test from 'ava';

import cryptTest from './helpers/_crypt-test';
import caesarSalad from '..';

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
	test(task.title + ' (encrypt)', cryptTest, {
		...task,
		cipher: caesarSalad.ROT47.Cipher
	});

	test(task.title + ' (decrypt)', cryptTest, {
		...task,
		cipher: caesarSalad.ROT47.Decipher,
		input: task.expected,
		expected: task.input
	});
});
