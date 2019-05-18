import test from 'ava';
import caesarSalad from '..';

import cryptTest from './helpers/crypt-test';

[
	{
		title: 'basic test',
		input: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		expected: '!"#$%&\'()*+,-./5678901234:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm{|}~'
	}
].forEach(task => {
	test(task.title + ' (encrypt)', cryptTest, Object.assign({}, task, {
		cipher: caesarSalad.ROT18.Cipher
	}));

	test(task.title + ' (decrypt)', cryptTest, Object.assign({}, task, {
		cipher: caesarSalad.ROT18.Decipher,
		input: task.expected,
		expected: task.input
	}));
});
