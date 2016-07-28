const caesarSalad = require('../index');

const Caesar = caesarSalad.Caesar;
const Vigenere = caesarSalad.Vigenere;
const ROT13 = caesarSalad.ROT13;
const ROT5 = caesarSalad.ROT5;
const ROT18 = caesarSalad.ROT18;
const ROT47 = caesarSalad.ROT47;

describe('caesar-salad', function () {
	it('should exists', function () {
		xpect(caesarSalad).to.be.ok();
	});
});

describe('caesar', function () {
	it('should encrypt', function () {
		xpect(
			new Caesar.Cipher('c').crypt('abc-0123456789@example.com')
		).to.be(
			'cde-0123456789@gzcorng.eqo'
		);
	});

	it('should encrypt', function () {
		xpect(
			new Caesar.Decipher('c').crypt('cde-0123456789@gzcorng.eqo')
		).to.be(
			'abc-0123456789@example.com'
		);
	});
});

describe('vigenere', function () {
	it('should encrypt', function () {
		xpect(
			new Vigenere.Cipher('password').crypt('abc-0123456789@example.com')
		).to.be(
			'pbu-0123456789@wtodsae.ugi'
		);
	});

	it('should encrypt', function () {
		xpect(
			new Vigenere.Decipher('password').crypt('pbu-0123456789@wtodsae.ugi')
		).to.be(
			'abc-0123456789@example.com'
		);
	});
});

describe('rots', function () {
	it('should encrypt', function () {
		xpect(
			new ROT13.Cipher().crypt('abc-0123456789@example.com')
		).to.be(
			'nop-0123456789@rknzcyr.pbz'
		);
		xpect(
			new ROT5.Cipher().crypt('abc-0123456789@example.com')
		).to.be(
			'abc-5678901234@example.com'
		);
		xpect(
			new ROT18.Cipher().crypt('abc-0123456789@example.com')
		).to.be(
			'nop-5678901234@rknzcyr.pbz'
		);
		xpect(
			new ROT47.Cipher().crypt('abc-0123456789@example.com')
		).to.be(
			'234\\_`abcdefgho6I2>A=6]4@>'
		);
	});

	it('should encrypt', function () {
		xpect(
			new ROT13.Decipher().crypt('nop-0123456789@rknzcyr.pbz')
		).to.be(
			'abc-0123456789@example.com'
		);
		xpect(
			new ROT5.Decipher().crypt('abc-5678901234@example.com')
		).to.be(
			'abc-0123456789@example.com'
		);
		xpect(
			new ROT18.Decipher().crypt('nop-5678901234@rknzcyr.pbz')
		).to.be(
			'abc-0123456789@example.com'
		);
		xpect(
			new ROT47.Decipher().crypt('234\\_`abcdefgho6I2>A=6]4@>')
		).to.be(
			'abc-0123456789@example.com'
		);
	});
});

window.onload = function () {
	document.getElementById('mocha').innerHTML = '';

	var runner = mocha.run();
	runner.on('end', function () {
		exposeMochaResults(runner.stats);
	});

	// test if already ended:
	if (runner.stats.end) {
		exposeMochaResults(runner.stats);
	}
};
