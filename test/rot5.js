import test from 'ava';
import ROT5 from '../rot5';

import cryptTest from './helpers/crypt-test';

[
	{
		title: 'basic test',
		input: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		expected: '!"#$%&\'()*+,-./5678901234:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
	}
].forEach(task => {
	test(task.title + ' (encrypt)', cryptTest, Object.assign({}, task, {
		cipher: ROT5.Cipher
	}));

	test(task.title + ' (decrypt)', cryptTest, Object.assign({}, task, {
		cipher: ROT5.Decipher,
		input: task.expected,
		expected: task.input
	}));
});

