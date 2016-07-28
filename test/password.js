import test from 'ava';
import Password from '../password';

[
	'1_2',
	['x']
].forEach(pwd => {
	test(pwd + ' should throw an error', t => {
		t.throws(() => new Password(pwd));
	});
});

[
	{
		pwd: 1,
		shift: 1
	},
	{
		pwd: '1',
		shift: 1
	},
	{
		pwd: '-1',
		shift: -1
	},
	{
		pwd: 'b',
		shift: 1
	},
	{
		pwd: 'bc',
		shift: 1
	}
].forEach(task => {
	test(task.pwd + ' should be parsed to ' + task.shift, t => {
		t.is(new Password(task.pwd).to.shift(), task.shift);
	});
});

[
	{
		pwd: 1,
		shiftArray: [1]
	},
	{
		pwd: [1, 2],
		shiftArray: [1, 2]
	},
	{
		pwd: '1,2',
		shiftArray: [1, 2]
	},
	{
		pwd: '1,-2',
		shiftArray: [1, -2]
	},
	{
		pwd: 'bc',
		shiftArray: [1, 2]
	}
].forEach(task => {
	test(task.pwd + ' should be parsed to ' + task.shiftArray, t => {
		t.deepEqual(new Password(task.pwd).to.shiftArray(), task.shiftArray);
	});
});
