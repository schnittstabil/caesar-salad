window.onload = function() {
  SystemJS.config({
    baseURL: '/bower_components',
  });

  System.defaultJSExtensions = true;
  System.map['char-buffer'] = 'char-buffer/char-buffer';
  System.paths['caesar-salad/*'] = 'caesar-salad/lib/*.js';

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
