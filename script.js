//You can edit ALL of the code here
function setup() {
	let allShows = getAllShows();
	let showSelector = document.querySelector('#showSelector');
	// Making sort for all shows
	allShows = allShows.sort((a, b) => {
		let showA = a.name.toLowerCase();
		let showB = b.name.toLowerCase();

		if (showA < showB) {
			return -1;
		}
		if (showA > showB) {
			return 1;
		}
		return 0;
	});
	// Making options for all shows
	allShows.forEach((show) => {
		let option = document.createElement('option');
		showSelector.append(option);
		option.textContent = show.name;
		option.value = show.id;
	});

	// Making page for episodes
	let allEpisodes = [];
	let currentShowId;
	let currentShow;
	// Select show
	showSelector.addEventListener('change', () => {
		document.getElementById('root').innerHTML = '';

		//Geting current show
		currentShowId = showSelector.value;
		let newAllShows = allShows.filter((show) => {
			if (show.id == currentShowId) {
				return true;
			}
		});
		currentShow = newAllShows[0];

		//Getting episodes
		fetch(`https://api.tvmaze.com/shows/${currentShowId}/episodes`)
			.then((response) => response.json())
			.then((json) => {
				allEpisodes = json;
				makePageForEpisodes(allEpisodes);

				function selector() {
					// Building selector
					let episodeSelector = document.querySelector('#episodeSelector');
					episodeSelector.innerHTML = '';
					let placeholder = document.createElement('option');
					placeholder.value = 'chooseAnEpisode';
					placeholder.textContent = 'Choose an episode';
					placeholder.disabled = true;
					placeholder.selected = true;
					episodeSelector.append(placeholder);
					for (let i = 0; i < allEpisodes.length; i++) {
						let episode = document.createElement('option');
						episodeSelector.append(episode);
						episode.textContent = `S${allEpisodes[i].season
							.toString()
							.padStart(2, 0)}E${allEpisodes[i].number
							.toString()
							.padStart(2, 0)} - ${allEpisodes[i].name}`;
						episode.value = [i];
					}

					// Render currernt show details

					let showPoster = document.querySelector('#showPoster');
					showPoster.src = currentShow.image.original;

					let showName = document.querySelector('#showName');
					showName.textContent = currentShow.name;

					let genres = document.querySelector('.genres');
					genres.textContent = '';
					for (let i = 0; i < currentShow.genres.length; i++) {
						let genre = document.createElement('a');
						genre.textContent = currentShow.genres[i];
						genre.href = '#'
						genre.className = 'genre-tag';
						genres.append(genre)
					}

					let showSummary = document.querySelector('#showSummary');
					showSummary.innerHTML = currentShow.summary;

					// Render selected episode
					episodeSelector.addEventListener('change', () => {
						document.getElementById('root').innerHTML = '';
						let selectedEpisode = [allEpisodes[episodeSelector.value]];
						makePageForEpisodes(selectedEpisode);
						searchResult.textContent = `Displaying 1/${allEpisodes.length} episodes.`;
					});
				}
				selector();

				let searchResult = document.querySelector('#searchResult');
				searchResult.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes.`;
			})
			.catch((error) => console.log(error));
	});

	let header = document.querySelector('.header');
	header.style.background =
		"linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('https://1.bp.blogspot.com/-w_G1a8lpoiY/XK1evF74RmI/AAAAAAAAL44/grV_cVEMcEAq_vmjT3CdmfW5BunTHV4vgCLcBGAs/s2560/emilia-clarke-2880x1800-daenerys-targaryen-game-of-thrones-season-8-4k-17745.jpg') center/cover ";

	// Show poster + info

	// Search
	let searchBoxInput = document.getElementById('searchBoxInput');
	let filteredEpisodes = [];

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
		searchResult.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes.`;
	});

	// Clear search result
	let clearButton = document.querySelector('#clearButton');
	clearButton.addEventListener('click', () => {
		searchBoxInput.value = '';
		searchResult.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes.`;

		document.querySelector('#episodeSelector').value = 'chooseAnEpisode';

		document.getElementById('root').innerHTML = '';
		makePageForEpisodes(allEpisodes);
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

		let episodeImageWrapper = document.createElement('div');
		cardWrapper.append(episodeImageWrapper);
		episodeImageWrapper.className = 'episode-image-wrapper';

		let episodeImage = document.createElement('img');
		episodeImageWrapper.append(episodeImage);
		if (episode.image == null) {
			episodeImage.src =
				'https://media.movieassets.com/static/images/items/movies/posters/ddab5e00987cfdfff04a16cb470ca339.jpg';
		} else {
			episodeImage.src = episode.image.medium;
		}
		episodeImage.className = 'episode-image';

		let episodeDescription = document.createElement('div');
		cardWrapper.append(episodeDescription);
		if (episode.summary == null) {
			episodeDescription.innerHTML = 'No summary availibale';
		} else {
			episodeDescription.innerHTML = episode.summary;
		}
		episodeDescription.className = 'episode-description';

		let text = episodeDescription.textContent;
		let lettersToCut = 340;

		if (episodeDescription.textContent.length > lettersToCut) {
			text = text.substr(0, lettersToCut);
			episodeDescription.textContent = text;
			let readMore = document.createElement('a');
			readMore.textContent = 'Read more';
			readMore.href = '#';
			episodeDescription.append('...');
			episodeDescription.append(readMore);
		}

		// let watchButton = document.createElement('button');
		// cardWrapper.append(watchButton);
		// watchButton.textContent = 'Watch an episode';
		// watchButton.className = 'button';
	});
}

window.onload = setup;
