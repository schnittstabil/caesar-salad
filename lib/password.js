import './polyfills'; // Number.isInteger

function ShiftMixin() {
  this.shift = function() {
    return this.shiftArray()[0];
  };

  this.shiftArray = function() {
    var passwd = this.getPassword(),
        forDecryption = this.symbols.indexOf('forDecryption') + 1;

    passwd = passwd.map(function (num) {
      if (forDecryption) {
        return (26 - num) % 26;
      } else {
        return num % 26;
      }
    });

    if (passwd.length === 0) {
      return [0];
    }

    return passwd;
  };
}

function passwordToShiftArray(passwd) {
  var shiftArrayRegExp = /^[-+]?[0-9]+(,[-+]?[0-9]+)*$/,
      shiftStringRegExp = /^[A-Za-z]*$/;

  if (typeof passwd === 'undefined' || passwd === null) {
    return [0];
  }

  if (Number.isInteger(passwd)) {
    return [passwd];
  }

  if (typeof passwd === 'string' && shiftArrayRegExp.test(passwd)) {
    return passwd.split(',').map(Number);
  }

  if (typeof passwd === 'string' && shiftStringRegExp.test(passwd)) {
    return passwd.toLowerCase().split('').map(function(c) {
      return c.charCodeAt(0) - 97;
    });
  }

  if (passwd && passwd.every && passwd.every(Number.isInteger)) {
    return passwd.slice();
  }

  throw new RangeError('Unable to parse password: ' + passwd);
}


// start state: password
var dfa = {
  'password': ['to', 'forDecryption'],
  'to': [],
  'forDecryption': ['to']
};

// start state: password
var mixins = {
  'to': [ShiftMixin]
};

class Password {
  /**
   * Handles password parsing for {{#crossLink "Caesar"}}{{/crossLink}} and {{#crossLink "Vigenere"}}{{/crossLink}}.
   *
   * `Password` is a {{#ext "Builder" "en.wikipedia.org/wiki/Builder_pattern"}}{{/ext}} with a {{#ext "Fluent Interface" "en.wikipedia.org/wiki/Fluent_interface"}}{{/ext}} providing the following methods:
   *
   * <span style="font-family:monospace">
   *   ℒ<sub><span style="font-family:cursive">passwd</span></sub> := {<br/>
   *   &nbsp;&nbsp;new Password(<span style="font-family:cursive">passwd</span>).to.shift(),<br/>
   *   &nbsp;&nbsp;new Password(<span style="font-family:cursive">passwd</span>).to.shiftArray(),<br/>
   *   &nbsp;&nbsp;new Password(<span style="font-family:cursive">passwd</span>).forDecryption.to.shift(),<br/>
   *   &nbsp;&nbsp;new Password(<span style="font-family:cursive">passwd</span>).forDecryption.to.shiftArray()<br/>
   *   }</span> (for all valid <span style="font-family:cursive">passwd</span>)
   *
   * Valid password formats:
   *
   *     new Password( 1  ).to.shift() // returns: 1
   *     new Password('1' ).to.shift() // returns: 1
   *     new Password('-1').to.shift() // returns: -1
   *     new Password('b' ).to.shift() // returns: 1
   *     new Password('bc').to.shift() // returns: 1
   *
   *     new Password( 1    ).to.shiftArray() // returns: [1]
   *     new Password([1, 2]).to.shiftArray() // returns: [1, 2]
   *     new Password('1, 2').to.shiftArray() // returns: [1, 2]
   *     new Password('1,-2').to.shiftArray() // returns: [1, -2]
   *     new Password('bc'  ).to.shiftArray() // returns: [1, 2]
   *
   * @class Password
   * @constructor
   * @param passwd {Number|String|[Number]} The password to parse.
   */
  constructor(passwd, symbol, parent) {
    if (!symbol) {
      symbol = 'password';
    }

    var children = dfa[symbol],
        i,
        len;

    if (parent instanceof Password) {
      this.symbols = parent.symbols.slice();
      this.getPassword = parent.getPassword;
    } else {
      this.symbols = [];
      passwd = passwordToShiftArray(passwd);
      this.getPassword = function() {
        return passwd;
      };
    }

    this.symbols.push(symbol);

    // mixins
    if (mixins[symbol]) {
      for (i = 0, len = mixins[symbol].length; i < len; i++) {
        mixins[symbol][i].call(this);
      }
    }

    // create children
    for (i = 0; i < children.length; i++) {
      this[children[i]] = new Password(null, children[i], this);
    }
  }
}

// ES6-CommonJs interop:
Password['default'] = Password;

export default Password;
