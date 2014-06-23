window.onload = function() {
  System.map['char-buffer'] = 'bower_components/char-buffer/char-buffer';
  System.paths['caesar-salad/*'] = '/bower_components/caesar-salad/lib/*.js';

  System
    .import('caesar-salad/caesar-salad')
    .then(function(cs) {
      document.write(cs['default'].Vigenere.Cipher('abc').crypt('user@example.com'));
    })
    .catch(function(e) {
      document.write(e);
      console.error(e);
      throw e;
    });
};
