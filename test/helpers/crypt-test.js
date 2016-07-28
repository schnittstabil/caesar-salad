module.exports = function cryptTest(t, task) {
	const cipher = task.cipher(task.password);
	const input = Array.isArray(task.input) ? task.input : [task.input];
	const expected = Array.isArray(task.expected) ? task.expected : [task.expected];

	for (var i = 0; i < input.length; i++) {
		t.is(cipher.crypt(input[i]), expected[i]);
	}
};
