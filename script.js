//You can edit ALL of the code here
function setup() {
	const allEpisodes = getAllEpisodes();
	makePageForEpisodes(allEpisodes);
	selector();

	let header = document.querySelector('.header');
	header.style.background =
		"linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('https://1.bp.blogspot.com/-w_G1a8lpoiY/XK1evF74RmI/AAAAAAAAL44/grV_cVEMcEAq_vmjT3CdmfW5BunTHV4vgCLcBGAs/s2560/emilia-clarke-2880x1800-daenerys-targaryen-game-of-thrones-season-8-4k-17745.jpg') center/cover ";

	// Show poster + info
	let showPoster = document.querySelector('#showPoster');
	let currentShow = getOneShow();
	console.log(currentShow);
	showPoster.src = currentShow.image.medium;

	let showName = document.querySelector('#showName');
	showName.textContent = currentShow.name;

	let showSummary = document.querySelector('#showSummary');
	showSummary.innerHTML = currentShow.summary;

	// Search
	let searchBoxInput = document.getElementById('searchBoxInput');
	let filteredEpisodes = [];
	let searchResult = document.querySelector('#searchResult');
	searchResult.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes:`;

	// Filter items
	searchBoxInput.addEventListener('keyup', () => {
		// Getting filtered episodes
		filteredEpisodes = allEpisodes.filter((episode) => {
			if (
				episode.name.toLowerCase().includes(searchBoxInput.value.toLowerCase())
			) {
				return true;
			} else return false;
		});

		// Render filtered episodes
		const rootElem = document.getElementById('root');
		rootElem.innerHTML = '';
		makePageForEpisodes(filteredEpisodes);

		// Search Result
		searchResult.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes:`;
	});

	// Clear search result
	let clearButton = document.querySelector('#clearButton');
	clearButton.addEventListener('click', () => {
		searchBoxInput.value = '';
		searchResult.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes:`;

		document.querySelector('#episodeSelector').value = 'chooseAnEpisode'

		document.getElementById('root').innerHTML = '';
		makePageForEpisodes(allEpisodes);
	});
}

function selector() {
	// Building selector
	const allEpisodes = getAllEpisodes();
	let episodeSelector = document.querySelector('#episodeSelector');
	for (let i = 0; i < allEpisodes.length; i++) {
		let episode = document.createElement('option');
		episodeSelector.append(episode);
		episode.textContent = `S${allEpisodes[i].season
			.toString()
			.padStart(2, 0)}E${allEpisodes[i].number.toString().padStart(2, 0)} - ${
			allEpisodes[i].name
		}`;
		episode.value = [i];
	}

	// Render selected episode
	episodeSelector.addEventListener('change', (episode) => {
		console.log(episodeSelector.value);
		document.getElementById('root').innerHTML = '';
		let selectedEpisode = [allEpisodes[episodeSelector.value]];
		makePageForEpisodes(selectedEpisode);
		searchResult.textContent = `Displaying 1/${allEpisodes.length} episodes:`;
	});
		

}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById('root');

	episodeList.forEach((episode) => {
		let cardWrapper = document.createElement('div');
		rootElem.append(cardWrapper);
		cardWrapper.className = 'card-wrapper';

		let episodeWrapper = document.createElement('div');
		cardWrapper.append(episodeWrapper);
		episodeWrapper.className = 'episode-wrapper';

		let episodeWrapperContent = document.createElement('div');
		episodeWrapper.append(episodeWrapperContent);
		episodeWrapperContent.style.textAlign = 'center';

		let episodeName = document.createElement('span');
		episodeName.className = 'episode-name';
		episodeWrapperContent.append(episodeName);
		episodeName.textContent = episode.name;

		let episodeSeasonNumber = document.createElement('span');
		episodeSeasonNumber.className = 'episode-name';
		episodeWrapperContent.append(episodeSeasonNumber);
		if (episode.season > 9) {
			episodeSeasonNumber.textContent = ` - S${episode.season}`;
		} else episodeSeasonNumber.textContent = ` - S0${episode.season}`;

		let episodeNumber = document.createElement('span');
		episodeNumber.className = 'episode-name';
		episodeWrapperContent.append(episodeNumber);
		if (episode.number > 9) {
			episodeNumber.textContent = `E${episode.number}`;
		} else episodeNumber.textContent = `E0${episode.number}`;

		let episodeImage = document.createElement('img');
		cardWrapper.append(episodeImage);
		episodeImage.src = episode.image.medium;
		episodeImage.style.width = '100%';

		let episodeDescription = document.createElement('p');
		cardWrapper.append(episodeDescription);
		episodeDescription.innerHTML = episode.summary;
		episodeDescription.style.padding = '0 30px';

		// let watchButton = document.createElement('button');
		// cardWrapper.append(watchButton);
		// watchButton.textContent = 'Watch an episode';
		// watchButton.className = 'button';


	});
}

window.onload = setup;
