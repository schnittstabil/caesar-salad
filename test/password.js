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
		pwd: '2',
		shift: 2
	},
	{
		pwd: '-3',
		shift: -3
	},
	{
		pwd: 'd',
		shift: 3
	},
	{
		pwd: 'ef',
		shift: 4
	}
].forEach(task => {
	test(task.pwd + ' should be parsed to ' + task.shift, t => {
		t.is(new Password(task.pwd).to.shift(), task.shift);
	});
});

[
	{
		pwd: 25,
		shiftArray: [25]
	},
	{
		pwd: [23, 24],
		shiftArray: [23, 24]
	},
	{
		pwd: '21,22',
		shiftArray: [21, 22]
	},
	{
		pwd: '1,-2,3',
		shiftArray: [1, -2, 3]
	},
	{
		pwd: 'tu',
		shiftArray: [19, 20]
	}
].forEach(task => {
	test(task.pwd + ' should be parsed to ' + task.shiftArray, t => {
		t.deepEqual(new Password(task.pwd).to.shiftArray(), task.shiftArray);
	});
});
