export function* charRange(startChar, endChar) {
  var begin = startChar.charCodeAt(0),
      end = endChar.charCodeAt(0);

  for (var i = begin; i <= end; i++) {
    yield String.fromCharCode(i);
  }
}

export function* appendIterators() {
  var iterators = Array.prototype.slice.call(arguments);
  for (var iterator of iterators) {
    for (var i of iterator) {
      yield i;
    }
  }
}

export function toString(iterator) {
  var buffer = '';
  for (var i of iterator) {
    buffer += i;
  }
  return buffer;
}
