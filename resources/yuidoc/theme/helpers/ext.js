module.exports = {
  ext: function(title, scheme, path, options) {
    if (typeof options === 'undefined') {
      options = path;
      path = scheme;
      scheme = 'http';
    }
    return '<a class="external" href="' + scheme + '://' + path + '">' + title + '</a>';
  }
};
