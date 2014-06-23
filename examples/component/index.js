var cs = require('caesar-salad');

document.write(
  cs['default'].Vigenere.Cipher('abc').crypt('user@example.com')
);
