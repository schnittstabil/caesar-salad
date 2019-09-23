import test from 'ava';

import {charRange, appendIterators, toString} from './helpers/_iterator';
import cryptTest from './helpers/_crypt-test';
import caesarSalad from '..';

[
	{
		title: 'basic test',
		input: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		password: '3',
		expected: '!"#$%&\'()*+,-./0123456789:;<=>?@DEFGHIJKLMNOPQRSTUVWXYZABC[\\]^_`defghijklmnopqrstuvwxyzabc{|}~'
	},
	{
		title: 'example1',
		input: 'ABCD',
		password: 2,
		expected: 'CDEF'
	},
	{
		title: 'example2',
		input: 'CDEF',
		password: -2,
		expected: 'ABCD'
	},
	{
		title: 'example3',
		input: 'CDEF',
		password: 24,
		expected: 'ABCD'
	},
	{
		title: '"A" to "z" char ranges',
		input: toString(appendIterators(
			[' '], charRange('A', 'Z'), [' '], charRange('a', 'z'), [' ']
		)),
		password: 'b',
		expected: toString(appendIterators(
			[' '], charRange('B', 'Z'), ['A', ' '], charRange('b', 'z'), ['a', ' ']
		))
	}
].forEach(task => {
	test(task.title + ' (encrypt)', cryptTest, {
		...task,
		cipher: caesarSalad.Caesar.Cipher
	});

	test(task.title + ' (decrypt)', cryptTest, {
		...task,
		cipher: caesarSalad.Caesar.Decipher,
		input: task.expected,
		expected: task.input
	});
});
