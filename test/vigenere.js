import test from 'ava';
import Vigenere from '../vigenere';

import cryptTest from './helpers/crypt-test';

[
	{
		title: 'basic test',
		input: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		password: '2,1,0',
		expected: '!"#$%&\'()*+,-./0123456789:;<=>?@CCCFFFIIILLLOOORRRUUUXXXAA[\\]^_`adddgggjjjmmmpppsssvvvyyyb{|}~'
	},
	{
		title: 'example1',
		input: 'ABAB',
		password: 'abc',
		expected: 'ACCB'
	},
	{
		title: 'example2',
		input: ['AB', 'AB'],
		password: 'abc',
		expected: ['AC', 'CB']
	},
	{
		title: 'example3',
		input: 'ABAB',
		password: [0, -1, -2],
		expected: 'AAYB'
	},
	{
		title: 'email addresses',
		input: 'user@example.com',
		password: 'bcde',
		expected: 'vuhv@fzdqqnh.gpo'
	},
	{
		title: 'undefined password',
		input: 'user@example.com',
		password: undefined,
		expected: 'user@example.com'
	},
	{
		title: 'empty password',
		input: 'user@example.com',
		password: '',
		expected: 'user@example.com'
	},
	{
		title: 'empty array password',
		input: 'user@example.com',
		password: [],
		expected: 'user@example.com'
	},
	{
		title: 'number password',
		input: 'user@example.com',
		password: 1,
		expected: 'vtfs@fybnqmf.dpn'
	},
	{
		title: 'string number array password',
		input: 'user@example.com',
		password: '1,2,3,4',
		expected: 'vuhv@fzdqqnh.gpo'
	},
	{
		title: 'string number array password',
		input: 'user@example.com',
		password: [1, 2, 3, 4],
		expected: 'vuhv@fzdqqnh.gpo'
	}
].forEach(task => {
	test(task.title + ' (encrypt)', cryptTest, Object.assign({}, task, {
		cipher: Vigenere.Cipher
	}));

	test(task.title + ' (decrypt)', cryptTest, Object.assign({}, task, {
		cipher: Vigenere.Decipher,
		input: task.expected,
		expected: task.input
	}));
});
