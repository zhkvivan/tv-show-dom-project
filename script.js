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
	let currentShowId;
	let defaultBackground = 'https://i.ibb.co/ZGTZH8R/k-LAVl-croper-ru.jpg';
	// Select show
	showSelector.addEventListener('change', () => {
		document.getElementById('root').innerHTML = '';

		document.querySelector('.selector-box').style.display = 'block';
		document.querySelector('#orResult').style.display = 'block';
		document.querySelector('.search-box').style.display = 'block';
		document.querySelector('.episode-selector button').style.display =
			'inline-block';

		//Geting current show
		currentShowId = showSelector.value;
		let newAllShows = allShows.filter((show) => {
			if (show.id == currentShowId) {
				return true;
			}
		});
		let currentShow = newAllShows[0];

		let currentShowObject = backgroundImages.filter((bgShow) => {
			return bgShow.id == currentShow.id;
		});
		let currentShowBackgroundUrl;
		if (!(currentShowObject.length == 0) || currentShowObject == undefined) {
			currentShowBackgroundUrl = currentShowObject[0].url;
		} else {
			currentShowBackgroundUrl = defaultBackground;
		}
		// console.log(currentShowBackground);
		// header.style.background = `linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('${currentShowBackground}') top/cover `;

		let promiseFunction = function (url) {
			return new Promise((resolve, reject) => {
				let img = new Image();
				img.src = currentShowBackgroundUrl;

				img.onload = () => {
					resolve();
				};
				img.onerror = () => {
					reject(error);
				};
			});
		};

		promiseFunction(currentShowBackgroundUrl).then(
			() => {
				console.log('Status OK');
				renderCurrentShow(currentShow, currentShowBackgroundUrl);
			},
			(error) => {
				console.log(error);
			}
		);

		makeSimilarShowList(currentShow, allShows, currentShowBackgroundUrl);
		getAllEpisodes(currentShowId);
	});

	let header = document.querySelector('.header');
	header.style.background = `linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('${defaultBackground}') top/cover`;

	function makeFilter() {
		// Search
		let searchBoxInput = document.getElementById('searchBoxInput');
		let filteredEpisodes = [];

		// Filter items
		searchBoxInput.addEventListener('keyup', () => {
			// Getting filtered episodes
			filteredEpisodes = allEpisodes.filter((episode) => {
				if (
					episode.name
						.toLowerCase()
						.includes(searchBoxInput.value.toLowerCase())
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
	makeFilter();
}

function renderCurrentShow(show, currentShowBackgroundUrl) {
	// Render currernt show details in the header
	let header = document.querySelector('.header');

	// let currentShowBackground = backgroundImages.filter((bgShow) => {
	// 	return bgShow.id == show.id;
	// });
	// currentShowBackground = currentShowBackground[0].url;
	// console.log(currentShowBackground);
	header.style.background = `linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('${currentShowBackgroundUrl}') top/cover `;

	console.log(currentShowBackgroundUrl);

	let showPoster = document.querySelector('#showPoster');
	showPoster.src = show.image.original;

	let showName = document.querySelector('#showName');
	showName.textContent = show.name;

	let genres = document.querySelector('.genres');
	genres.textContent = '';
	for (let i = 0; i < show.genres.length; i++) {
		let genre = document.createElement('a');
		genre.textContent = show.genres[i];
		genre.href = '#';
		genre.className = 'genre-tag';
		genres.append(genre);
	}

	let showSummary = document.querySelector('#showSummary');
	showSummary.innerHTML = show.summary;
}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById('root');
	rootElem.innerHTML = '';

	let searchResult = document.querySelector('#searchResult');

	searchResult.textContent = `Displaying ${episodeList.length}/${episodeList.length} episodes.`;

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

function buildEpisodeSelector(episodeList) {
	let episodeSelector = document.querySelector('#episodeSelector');

	episodeSelector.innerHTML = '';
	let placeholder = document.createElement('option');
	placeholder.value = 'chooseAnEpisode';
	placeholder.textContent = 'Choose an episode';
	placeholder.disabled = true;
	placeholder.selected = true;
	episodeSelector.append(placeholder);
	for (let i = 0; i < episodeList.length; i++) {
		let episode = document.createElement('option');
		episodeSelector.append(episode);
		episode.textContent = `S${episodeList[i].season
			.toString()
			.padStart(2, 0)}E${episodeList[i].number.toString().padStart(2, 0)} - ${
			episodeList[i].name
		}`;
		episode.value = [i];
	}
	document.getElementById('searchBoxInput').value = '';
}

function renderSelectedEpisode(selector, allEpisodeList) {
	selector.addEventListener('change', () => {
		document.getElementById('root').innerHTML = '';
		let selectedEpisode = [allEpisodeList[selector.value]];
		makePageForEpisodes(selectedEpisode);
		let searchResult = document.querySelector('#searchResult');
		searchResult.textContent = `Displaying 1/${allEpisodeList.length} episodes.`;
	});
}

function makeSimilarShowList(
	currentShow,
	allShowsList,
	currentShowBackgroundUrl
) {
	// Making a list for similar shows
	let currentShowGenres = currentShow.genres;

	let similarShows = [];
	allShowsList.forEach((show) => {
		let anyShowGenres = show.genres;
		if (
			currentShowGenres.every((genre) => {
				return anyShowGenres.some((a) => a == genre);
			})
		) {
			similarShows.push(show);
		}
	});

	// Excluding current show from the similar show list
	function excludeCurrentShow() {
		similarShows = similarShows.filter((show) => {
			return !(currentShow.id == show.id);
		});
	}

	excludeCurrentShow();

	if (similarShows.length < 7) {
		allShowsList.forEach((show) => {
			let anyShowGenres = show.genres;
			if (
				currentShowGenres.some((genre) => {
					return anyShowGenres.some((a) => a == genre);
				})
			) {
				similarShows.push(show);
			}
		});
		excludeCurrentShow();
	}

	if (similarShows.length < 7) {
		for (let i = 0; i < 30; i++) {
			similarShows.push(
				allShowsList[Math.floor(Math.random() * allShowsList.length)]
			);
		}
		excludeCurrentShow();
	}

	let uniqueRandomNumberArray = [];

	// Filling array for similar shows
	for (let i = 0; i < similarShows.length; i++) {
		uniqueRandomNumberArray.push(i);
	}

	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			let temp = arr[i];
			let randomNumber = Math.floor(Math.random() * (i + 1));
			arr[i] = arr[randomNumber];
			arr[randomNumber] = temp;
		}
		return arr;
	}

	// Shuffle
	shuffle(uniqueRandomNumberArray);

	let similarShowsWrapper = document.querySelector('.similar-shows-wrapper');
	similarShowsWrapper.textContent = '';

	// Render similar shows
	for (let i = 0; i < 7; i++) {
		let similarShowsItem = document.createElement('div');
		similarShowsItem.className = 'similar-shows-item';
		similarShowsWrapper.append(similarShowsItem);

		similarShowsItem.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});

			renderCurrentShow(
				similarShows[similarShowNumber],
				currentShowBackgroundUrl
			);
			makeSimilarShowList(
				similarShows[similarShowNumber],
				allShowsList,
				currentShowBackgroundUrl
			);
			document.querySelector('#showSelector').value =
				similarShows[similarShowNumber].id;
			getAllEpisodes(similarShows[similarShowNumber].id);
		});

		let similarShowImg = document.createElement('img');
		similarShowImg.className = 'similar-show-img';

		let similarShowNumber = uniqueRandomNumberArray[i];

		if (similarShows[similarShowNumber].image.medium == null) {
			similarShows[similarShowNumber].image.medium =
				'https://media.movieassets.com/static/images/items/movies/posters/ddab5e00987cfdfff04a16cb470ca339.jpg';
		}

		similarShowImg.src = similarShows[similarShowNumber].image.medium;
		similarShowsItem.append(similarShowImg);

		let similarShowGenres = document.createElement('p');
		similarShowGenres.className = 'similar-show-genres';
		similarShows[similarShowNumber].genres.forEach((genre) => {
			similarShowGenres.textContent += `${genre}, `;
		});
		similarShowGenres.textContent = similarShowGenres.textContent.slice(0, -2);
		similarShowsItem.append(similarShowGenres);

		let similarShowName = document.createElement('h3');
		similarShowName.className = 'similar-show-name';
		similarShowName.textContent = similarShows[similarShowNumber].name;
		similarShowsItem.append(similarShowName);
	}
}

function getAllEpisodes(currentShowId) {
	//Getting episodes
	fetch(`https://api.tvmaze.com/shows/${currentShowId}/episodes`)
		.then((response) => response.json())
		.then((json) => {
			allEpisodes = json;

			if (!(allEpisodes.status == 404)) {
				makePageForEpisodes(allEpisodes);
				buildEpisodeSelector(allEpisodes);
				renderSelectedEpisode(episodeSelector, allEpisodes);
			} else {
				document.querySelector('.episode-selector').style.fontSize = '24px';
				document.querySelector('#searchResult').textContent =
					'Sorry, we have nothing to show';
				document.querySelector('.selector-box').style.display = 'none';
				document.querySelector('#orResult').style.display = 'none';
				document.querySelector('.search-box').style.display = 'none';
				document.querySelector('.episode-selector button').style.display =
					'none';
			}
		})
		.catch((error) => console.log(error));
}

let backgroundImages = [
	{
		id: 1632,
		name: 'Horatio Hornblower',
		url: 'https://avatars.mds.yandex.net/get-zen_doc/1329105/pub_5f97b0241772f52b500a9320_5f97b088b2613332b084a3d8/scale_1200',
	},
	{
		id: 1905,
		name: 'Bleach',
		url: 'https://vsthemes.org/uploads/posts/2018-12/1581997840_bleach_vsthemes_ru-3.jpg',
	},
	{
		id: 465,
		name: 'Band of Brothers',
		url: 'https://mocah.org/uploads/posts/1166113-people-soldier-military-Band-of-Brothers-crowd-troop.jpg',
	},
	{
		id: 768,
		url: '../img/768.jpg',
	},
	{
		id: 169,
		url: '../img/169.jpg',
	},
	{
		id: 179,
		url: '../img/179.jpg',
	},
	{
		id: 180,
		url: '../img/180.jpg',
	},
	{
		id: 204,
		url: '../img/204.jpg',
	},
	{
		id: 565,
		name: 'Deadwood',
		url: '../img/565.jpg',
	},
	{
		id: 523,
		name: 'The West Wing',
		url: '../img/523.jpg',
	},
	{
		id: 527,
		name: 'The Sopranos',
		url: '../img/527.jpg',
	},
	{
		id: 748,
		name: 'Oz',
		url: '../img/748.jpg',
	},
	{
		id: 1910,
		name: 'Bron / Broen',
		url: '../img/1910.jpg',
	},
	{
		id: 396,
		name: 'Gravity Falls',
		url: '../img/396.jpg',
	},
];

window.onload = setup;
