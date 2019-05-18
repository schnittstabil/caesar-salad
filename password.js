'use strict';

function ShiftMixin() {
	this.shift = () => this.shiftArray()[0];
	this.shiftArray = () => {
		const forDecryption = this.symbols.indexOf('forDecryption') + 1;
		const passwd = this.getPassword().map(num => forDecryption ? (26 - num) % 26 : num % 26);

		if (passwd.length === 0) {
			return [0];
		}

		return passwd;
	};
}

function passwordToShiftArray(passwd) {
	const shiftArrayRegExp = /^[-+]?\d+(,[-+]?\d+)*$/;
	const shiftStringRegExp = /^[A-Za-z]*$/;

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
		return passwd.toLowerCase().split('').map(c => c.charCodeAt(0) - 97);
	}

	if (passwd && passwd.every && passwd.every(Number.isInteger)) {
		return passwd.slice();
	}

	throw new RangeError('Unable to parse password: ' + passwd);
}

// Start state: password
const dfa = {
	password: ['to', 'forDecryption'],
	to: [],
	forDecryption: ['to']
};

// Start state: password
const mixins = {
	to: [ShiftMixin]
};

class Password {
	/**
	 * Handles password parsing for {{#crossLink "Caesar"}}{{/crossLink}} and {{#crossLink "Vigenere"}}{{/crossLink}}.
	 *
	 * `Password` is a <a class="external" href="https://en.wikipedia.org/wiki/Builder_pattern">Builder</a> with a <a class="external" href="https://en.wikipedia.org/wiki/Fluent_interface">Fluent Interface</a> providing the following methods:
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
	 * @param {Number|String|[Number]} passwd The password to parse.
	 * @param {String} [symbol] internal argument for fluent interface
	 * @param {Password} [parent] internal argument for fluent interface
	 */
	constructor(passwd, symbol, parent) {
		if (!symbol) {
			symbol = 'password';
		}

		if (parent instanceof Password) {
			this.symbols = parent.symbols.slice();
			this.getPassword = parent.getPassword;
		} else {
			this.symbols = [];
			passwd = passwordToShiftArray(passwd);
			this.getPassword = () => passwd;
		}

		this.symbols.push(symbol);

		// Mixins
		if (mixins[symbol]) {
			mixins[symbol].forEach(mixin => mixin.call(this));
		}

		// Create children
		dfa[symbol].forEach(child => {
			this[child] = new Password(null, child, this);
		});
	}
}

module.exports = Password;
