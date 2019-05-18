exports.charRange = function * (startChar, endChar) {
	const begin = startChar.charCodeAt(0);
	const end = endChar.charCodeAt(0);

	for (let i = begin; i <= end; i++) {
		yield String.fromCharCode(i);
	}
};

exports.appendIterators = function * (args) {
	const iterators = Array.prototype.slice.call(...args);

	for (const iterator of iterators) {
		for (const i of iterator) {
			yield i;
		}
	}
};

exports.toString = function (iterator) {
	let buffer = '';

	for (const i of iterator) {
		buffer += i;
	}

	return buffer;
};
