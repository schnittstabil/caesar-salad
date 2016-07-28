exports.charRange = function * (startChar, endChar) {
	var begin = startChar.charCodeAt(0);
	var end = endChar.charCodeAt(0);

	for (var i = begin; i <= end; i++) {
		yield String.fromCharCode(i);
	}
};

exports.appendIterators = function * () {
	var iterators = Array.prototype.slice.call(arguments);

	for (var iterator of iterators) {
		for (var i of iterator) {
			yield i;
		}
	}
};

exports.toString = function (iterator) {
	var buffer = '';

	for (var i of iterator) {
		buffer += i;
	}

	return buffer;
};
