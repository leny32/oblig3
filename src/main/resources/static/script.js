$(function () {
	hentBilletter()
})

$('#antallBiletter').on('input', function () {
	testFelt('antallBiletter')
})

$('#fornNavn').on('input', function () {
	testFelt('fornNavn')
})

$('#etterNavn').on('input', function () {
	testFelt('etterNavn')
})

$('#telefonNr').on('input', function () {
	testFelt('telefonNr')
})

$('#epost').on('input', function () {
	testFelt('epost')
})

let telefonNrRegex = /^(\+\d{1,3}[- ]?)?\d{8}$/
let epostRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let navnRegex = /^[a-zA-ZæøåÆØÅ' ]{2,30}$/

function testInfo() {
	let telefonNrRegex = /^(\+\d{1,3}[- ]?)?\d{8}$/
	let epostRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	let navnRegex = /^[a-zA-ZæøåÆØÅ' ]{2,30}$/

	let fornNavn = $('#fornNavn').val().trim()
	let etterNavn = $('#etterNavn').val().trim()
	let telefonNr = $('#telefonNr').val().trim()
	let epost = $('#epost').val().trim()
	let antallBiletter = $('#antallBiletter').val().trim()

	if (!fornNavn || !etterNavn || !telefonNr || !epost || !antallBiletter) {
		alert('Alle felt må fylles ut')
		return
	}
	if (!telefonNrRegex.test(telefonNr)) {
		alert('Vennligst skriv inn et gyldig telefonnummer')
		return
	}
	if (!epostRegex.test(epost)) {
		alert('Vennligst skriv inn en gyldig e-postadresse')
		return
	}
	if (!navnRegex.test(fornNavn) || !navnRegex.test(etterNavn)) {
		alert('Skriv inn et gyldig navn')
		return
	}
	lagreInfo()
}

function testFelt(data) {
	let feltTilTest = $('#' + data + 'Error')
	let felt = $('#' + data)
	let regex = ''
	let feilmelding = ''

	switch (data) {
		case 'fornNavn':
			regex = navnRegex
			feilmelding = 'Skriv inn et gyldig navn'
			break
		case 'etterNavn':
			regex = navnRegex
			feilmelding = 'Skriv inn et gyldig navn'
			break
		case 'telefonNr':
			regex = telefonNrRegex
			feilmelding = 'Skriv inn et gyldig telefonnummer'
			break
		case 'epost':
			regex = epostRegex
			feilmelding = 'Skriv inn en gyldig e-postadresse'
			break
		case 'antallBiletter':
			regex = /^[0-9]{1,2}$/
			feilmelding = 'Skriv inn et gyldig antall biletter'
			break
	}

	if (!regex.test(felt.val())) {
		feltTilTest.text(feilmelding)
		feltTilTest.show()
	} else {
		feltTilTest.hide()
	}
}

// Her inkluderer jeg også hvordan funksjonene lagreInfo og hentBilletter kunne implementeres basert på din beskrivelse.

function lagreInfo() {
	const billett = {
		id: $('#id').val(),
		filmer: $('#filmer').val(),
		antallBiletter: $('#antallBiletter').val(),
		fornNavn: $('#fornNavn').val(),
		etterNavn: $('#etterNavn').val(),
		telefonNr: $('#telefonNr').val(),
		epost: $('#epost').val(),
	}

	$.post('/lagre', billett, function () {
		hentBilletter()
	})

	// Tøm input-feltene
	$('#filmer').val('')
	$('#antallBiletter').val('')
	$('#fornNavn').val('')
	$('#etterNavn').val('')
	$('#telefonNr').val('')
	$('#epost').val('')

	// Tøm feilmeldinger
	$('#filmerError').hide()
	$('#antallBiletterError').hide()
	$('#fornNavnError').hide()
	$('#etterNavnError').hide()
	$('#telefonNrError').hide()
	$('#epostError').hide()
}

function hentBilletter() {
	$.get('/hentBilletter', function (visBilletter) {
		formaterBilletter(visBilletter)
	})
}

function formaterBilletter(visBilletter) {
	let ut = ''
	for (let billett of visBilletter) {
		ut += `
        Film: ${billett.filmer}<br>
        Antall biletter: ${billett.antallBiletter}<br>
        Fornavn: ${billett.fornNavn}<br>
        Etternavn: ${billett.etterNavn}<br>
        Telefonnummer: ${billett.telefonNr}<br>
        E-post: ${billett.epost}<br>
        <button class='btn btn-warning' onclick='slettBillett(${billett.id}'>Slett</button>
        `
	}
	document.getElementById('output').innerHTML = ut
}

function slettBillett(id) {
	$.post('/slettBilett', { id: id }, function () {
		hentBilletter()
	})
}

function slettArray() {
	$.post('/slettAlt', function () {
		hentBilletter()
	})
}
