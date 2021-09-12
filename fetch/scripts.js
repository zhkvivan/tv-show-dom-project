// This function should retrieve the JSON from the `countryURL` and then call onCountryDataReceived() with the JSON
function getData(countryURL) {
	fetch(countryURL)
		.then((res) => res.json())
		.then((out) => {
			// console.log('Output: ', out);
			let currentCountry = out[0];
			console.log(currentCountry)
			onCountryDataReceived(currentCountry)
		})
		.catch((error) => console.log(error));
}

function onCountryDataReceived(country) {
	addCountryName(country);
	addCountryCapital(country);
	addNameInOtherLanguages(country);
}

// This function should take the JSON for the country and put a H1 tag on the screen containing its name
function addCountryName(countryData) {
	let countryNameHeading = document.createElement('h1');
	countryNameHeading.textContent = countryData.name;
	getContentDiv().append(countryNameHeading)
}

// This function should take the JSON for the country and put a H2 tag on the screen containing its capital city
function addCountryCapital(countryData) {
	let capitalName = document.createElement('h2');
	capitalName.textContent = `Capital City: ${countryData.capital}`;
	getContentDiv().append(capitalName)
}

// This function should take the JSON for the country and put UL and LI tags on the screen with the countries name translated into other languages
function addNameInOtherLanguages(countryData) {
	let ulNames = document.createElement('ul');
	getContentDiv().append(ulNames);
	let translations = Object.values(countryData.translations);
	console.log(translations)
	for (let i = 0; i < translations.length; i++) {
		let li = document.createElement('li');
		li.textContent = translations[i];
		ulNames.append(li)
	}
}

function getContentDiv() {
	return document.querySelector('#content');
}

function onLoad() {
	getData(
		'https://restcountries.eu/rest/v2/name/Great%20Britain?fullText=true'
	);

	

    getData("https://restcountries.eu/rest/v2/name/France?fullText=true");

    getData("https://restcountries.eu/rest/v2/name/Germany?fullText=true");

    getData("https://restcountries.eu/rest/v2/name/Spain?fullText=true");

    getData("https://restcountries.eu/rest/v2/name/Portugal?fullText=true");

    getData("https://restcountries.eu/rest/v2/name/Hungary?fullText=true");

    getData("https://restcountries.eu/rest/v2/name/Russia?fullText=true");

   
}

window.onload = onLoad;
