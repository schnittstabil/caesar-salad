const CeasarSalad = require('caesar-salad');

function onChange() {
	const type = $('input[name=type]:checked', '#inputForm').val();
	const cipherName = $('#cipher').val();
	const password = $('#key').val();

	const cipher = CeasarSalad[cipherName][type](password);

	$('#output').val(cipher.crypt($('#input').val()));
}

$(function () {
	const cipher = $('#cipher');

	CeasarSalad.ciphers.forEach(function (name) {
		cipher.append($('<option />').val(name).text(name));
	});

	$('#cipher option:last').attr('selected', 'selected');

	$('#cipher').on('input', onChange);
	$('#key').on('input', onChange);
	$('#input').on('input', onChange);
	$('input[name=type]', '#inputForm').on('change', onChange);

	onChange();
});
