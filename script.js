let section = ''; //Character for searching
let searchString = ''; // Search input's value stores here
let currentGenre = [];
let allShows = getAllShows();
let arr_EN = [
	'0-9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
let allShowsForRender = prepareShowListArr(allShows);

function makeHomePage() {
	// Setting logo. When click on logo, it's 'refreshing' the page
	logo.addEventListener('click', () => {
		document.querySelector('.show-info-wrap').style.display = 'none';

		filter.style.display = 'none';
		root.style.display = 'none';
		document.querySelector('.slider-wrap').style.display = 'block';
		content.style.display = 'block';
	});

	let showInfo = document.querySelector('.show-info-wrap');
	showInfo.style.display = 'none';

	let header = document.querySelector('.header');
	header.style.minHeight = '500px';

	let popularShowsHeader = document.querySelector(
		'.similar-shows-top-line > h2'
	);
	popularShowsHeader.textContent = 'Popular TV-Shows';

	returnButton.style.display = 'none';
	let showSelectorDesc = document.querySelector('.show-selector-desc');
	showSelectorDesc.style.display = 'none';

	filter.style.display = 'none';

	buildShowSelector(allShows);

	let uniqueNumbersArray = [];

	for (let i = 0; i < allShows.length; i++) {
		uniqueNumbersArray.push(i);
	}

	let showsWithAPoster = allShows.filter((show) => {
		if (!(show.image == null)) {
			return show;
		}
	});

	renderShowRow(showsWithAPoster, allShows);

	// Making page for episodes
	let currentShowId;
	let defaultBackground = 'https://i.ibb.co/ZGTZH8R/k-LAVl-croper-ru.jpg';

	// Select show
	showSelector.addEventListener('change', () => {
		currentShowId = showSelector.value;
		makePageForSelectedShow(currentShowId, allShows);
	});

	returnButton.addEventListener('click', () => {
		content.style.display = 'block';
		content.scrollIntoView(true);
		document.querySelector('.show-info-wrap').style.display = 'none';

		let popularShowsHeader = document.querySelector(
			'.similar-shows-top-line > h2'
		);
		popularShowsHeader.textContent = 'Popular TV-Shows';
		showSelector.value = 'chooseAShow';
		filter.style.display = 'none';
		root.style.display = 'none';
		root.textContent = '';
		document.querySelector('.slider-wrap').style.display = 'block';
	});

	function makeEpisodeFilter() {
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
	makeEpisodeFilter();

	function buildShowFilter() {
		let alphabetBox = document.querySelector('.alphabet-box');

		// Creating alphabet filter
		for (let i = 0; i < arr_EN.length; i++) {
			let item = document.createElement('div');
			item.className = 'alphabet-item';
			item.setAttribute('pressed', false);
			alphabetBox.append(item);

			let letter = document.createElement('span');
			letter.className = 'alphabet-letter';
			letter.textContent = arr_EN[i];
			item.append(letter);

			let numberOfShows = document.createElement('span');
			numberOfShows.className = 'alphabet-number';
			let letterArr = allShows.filter((show) => {
				let nameArr = Array.from(show.name);
				if (arr_EN[i] == '0-9') {
					let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
					if (
						arr.some((number) => {
							if (number == nameArr[0]) {
								return true;
							}
						})
					) {
						return true;
					}
				} else {
					if (nameArr[0] == arr_EN[i]) {
						return show;
					}
				}
			});
			numberOfShows.textContent = letterArr.length;
			item.append(numberOfShows);

			item.addEventListener('click', () => {
				if (section == arr_EN[i]) {
					section = '';
					item.style.backgroundColor = '#0c142b';
					item.querySelector('.alphabet-letter').style.color = '#5cb9ff';
				} else {
					section = arr_EN[i];

					let allLetters = document.querySelectorAll('.alphabet-item');
					Array.from(allLetters).forEach((item) => {
						item.style.backgroundColor = '#0c142b';
						item.querySelector('.alphabet-letter').style.color = '#449ee0';
					});

					// Highlighting current letter/section
					item.style.backgroundColor = '#17e69d';
					item.querySelector('.alphabet-letter').style.color = '#061e30';
				}
				showSearch();
			});
		}

		// Create Genres filter
		function buildGenresFilter() {
			// Getting all the genres from all tv shows and creating array with all genres
			let allGenresArr = [];
			allShows.forEach((show) => {
				show.genres.forEach((genre) => {
					allGenresArr.push(genre);
				});
			});

			// Delete duplicates from the genres array
			let allUniqueGenres = new Set(allGenresArr);
			allGenresArr = Array.from(allUniqueGenres);
			allGenresArr.sort();

			// Rendering each genre on the filter section:
			let genresInner = document.querySelector('.genres-inner'); // Getting parent container
			allGenresArr.forEach((genre) => {
				// Creating a separate span for each genre:
				let span = document.createElement('span');
				span.className = 'genre-filter';
				// populate each span with each genre:
				span.textContent = genre;
				genresInner.append(span);
				// Adding event listener for each span. It makes the clicked span colored/uncolored.
				span.addEventListener('click', () => {
					// Checking if array with genres for filtering doesn't contain the genre we've clicked on
					if (!currentGenre.includes(span.textContent)) {
						// If it doesn't, we need to add clicked genre to the array and make it accent color
						currentGenre.push(span.textContent);
						span.style.color = 'var(--main-accent)';
					} else {
						// It it already contains the clicked genre, we just make it default color and do filtering and filter that genre out.
						span.style.color = '#5cb9fe';
						currentGenre = currentGenre.filter((genre) => {
							if (!(genre == span.textContent)) {
								return true;
							}
						});
					}
					// then when currentGenre array is ready, we call showSearch function that uses currentGenre array.
					showSearch();
				});
			});
		}
		buildGenresFilter();

		// Set up clear filter btn
		clearFilterBtn.addEventListener('click', () => {
			section = ''; // reset char
			searchString = ''; // reset var for search string
			showSearchInput.value = ''; // reset search input itself
			document.querySelectorAll('.alphabet-item').forEach((item) => {
				item.style.background = '#0c142b';
				item.querySelector('.alphabet-letter').style.color = '#5cb9ff';
			});
			currentGenre = [];
			document.querySelectorAll('.genre-filter').forEach((genre) => {
				genre.style.color = '#5cb9fe';
			});
			showSearch();
		});
	}

	renderShows(allShowsForRender, allShows);

	buildShowFilter();

	function updateSearchString(e) {
		searchString = e.target.value;
		showSearch();
		searchString.length > 0
			? (clearInputBackspace.style.display = 'block')
			: (clearInputBackspace.style.display = 'none');
	}

	showSearchInput.addEventListener('input', updateSearchString);
	mainTopSearch.addEventListener('input', (e) => {
		document.querySelector('.slider-wrap').style.display = 'none';
		document.querySelector('.similar-shows').style.display = 'none';
		document.querySelector('.header').style.minHeight = 'unset';
		document.querySelector('.show-info-wrap').style.display = 'none';

		document.querySelector('#filter').style.display = 'none';
		document.querySelector('#root').style.display = 'none';

		document.querySelector('#content').style.display = 'block';

		showSearchInput.value = e.target.value;
		updateSearchString(e);
	});

	clearInputBackspace.addEventListener('click', () => {
		searchString = '';
		showSearchInput.value = '';
		showSearch();
	});

	inTitles.addEventListener('click', () => {
		if (searchString == '') {
			return;
		} else showSearch();
	});
	inTitlesAndText.addEventListener('click', () => {
		if (searchString == '') {
			return;
		} else showSearch();
	});
}

function showSearch() {
	let searchResultArray = [];
	let inTitles = document.querySelector('#inTitles');

	// Get all shows and filter them to get only current section's/letter's shows
	let showsInSection = allShows.filter((show) => {
		// If no one section has choosen, return true for all shows. Searching in all shows
		if (section == '') {
			return true;
		} else if (section == '0-9') {
			// Corner case with '0-9' section
			let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			if (arr.includes(+show.name[0])) {
				return true;
			}
		} else if (show.name[0] == section) {
			// Getting shows that start from current letter
			return true;
		}
	});

	// Filter by searchString
	if (inTitles.checked) {
		searchResultArray = showsInSection.filter((show) => {
			if (show.name.toLowerCase().includes(searchString.toLowerCase())) {
				return true;
			}
		});
	} else {
		searchResultArray = showsInSection.filter((show) => {
			if (
				show.name.toLowerCase().includes(searchString.toLowerCase()) ||
				show.summary.toLowerCase().includes(searchString.toLowerCase())
			) {
				return true;
			}
		});
	}

	// Filter by genre
	for (let i = 0; i < currentGenre.length; i++) {
		searchResultArray = searchResultArray.filter((show) => {
			// Condition for filtering
			if (show.genres.includes(currentGenre[i])) {
				return true;
			}
		});
	}

	let contentInner = document.querySelector('.content-inner');
	contentInner.textContent = '';

	// Checking if final search result has any shows in it
	if (searchResultArray.length > 0) {
		// If yes - render those shows
		renderShows(searchResultArray, allShows);
	} else {
		// If no - show a message
		let sorry = document.createElement('span');
		sorry.classList.add('sorry');
		contentInner.append(sorry);
		sorry.textContent =
			"Sorry, we couldn't find anything. Try to change your request";
	}

	// Dynamic update number of shows on each letter
	document.querySelectorAll('.alphabet-item').forEach((item) => {
		let numberOfShowsOnCurrentLetter = searchResultArray.filter((show) => {
			let nameArr = Array.from(show.name);
			if (item.querySelector('.alphabet-letter').textContent == '0-9') {
				let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				if (
					arr.some((number) => {
						if (number == nameArr[0]) {
							return true;
						}
					})
				) {
					return true;
				}
			} else {
				if (nameArr[0] == item.querySelector('.alphabet-letter').textContent) {
					return show;
				}
			}
		});

		item.querySelector('.alphabet-number').textContent =
			numberOfShowsOnCurrentLetter.length;
	});
}

function renderCurrentShow(show, currentShowBackgroundUrl) {
	// Clean searhs input
	mainTopSearch.value = '';
	showSearchInput.value = '';

	// Clearing the array with the selected genres for search and making all of the genres in filter section defaut colored:
	currentGenre = [];
	document.querySelectorAll('.genre-filter').forEach((genre) => {
		genre.style.color = '#5cb9fe';
	});

	// Showing similar shows again after searching
	document.querySelector('.similar-shows').style.display = 'block';

	// Render currernt show details in the header
	let header = document.querySelector('.header');
	header.style.background = `linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('${currentShowBackgroundUrl}') top/cover `;

	// Setting poster of the current show
	let showPoster = document.querySelector('#showPoster');
	showPoster.src = show.image.original;

	// Setting name of the current show
	let showName = document.querySelector('#showName');
	showName.textContent = show.name;

	// Render genres of the current show
	let genres = document.querySelector('.genres');
	genres.textContent = '';
	for (let i = 0; i < show.genres.length; i++) {
		let genre = document.createElement('span');
		genre.textContent = show.genres[i];
		genre.className = 'genre-tag';
		genres.append(genre);
		genre.addEventListener('click', () => {
			currentGenre.push(show.genres[i]);
			filter.style.display = 'none';
			root.style.display = 'none';
			content.style.display = 'block';
			content.scrollIntoView(true);
			document.querySelectorAll('.genre-filter').forEach((genreSpan) => {
				if (genreSpan.textContent == show.genres[i]) {
					genreSpan.style.color = 'var(--main-accent)';
				}
			});
			showSearch();
		});
	}

	let showSummary = document.querySelector('#showSummary');
	showSummary.innerHTML = show.summary;

	// Button action
	let btn = document
		.querySelector('.show-info-content')
		.querySelector('button');
	btn.addEventListener('click', () => {
		filter.scrollIntoView(true);
	});

	// ???????????????????? ???????????? ???????????????????? ?????? ????????????

	function floatRight() {
		let container = document.querySelector('.show-info-content');
		// console.log(container.offsetHeight);
		if (
			container.offsetHeight >
			document.querySelector('.show-poster-box').offsetHeight
		) {
			document.querySelector('.show-poster-box').style.float = 'right';
			document.querySelector('.show-poster-box').style.marginRight = '0';
			document.querySelector('.show-poster-box').style.marginLeft = '5%';
		}
		if (
			container.offsetHeight <
			document.querySelector('.show-poster-box').offsetHeight
		) {
			document.querySelector('.show-poster-box').style.float = 'left';
			document.querySelector('.show-poster-box').style.marginRight = '5%';
			document.querySelector('.show-poster-box').style.marginLeft = '0';
		}
	}
	floatRight();

	function ajustH1() {
		let genres = document
			.querySelector('.show-info-content')
			.querySelector('.genres');

		let img = document.querySelector('.show-poster-box');
		if (
			showName.offsetHeight >= img.offsetHeight ||
			genres.offsetHeight + showName.offsetHeight + 60 >= img.offsetHeight
		) {
			img.style.float = 'unset';
			img.style.margin = '0';
			img.style.position = 'absolute';
			img.style.top = '90px';
			img.style.left = '0';
			img.style.width = '100%';
			img.style.height =
				document.querySelector('.header').offsetHeight - 90 + 'px';
			console.log('object');
		} else {
		}
	}
	ajustH1();

	window.onresize = function () {
		floatRight();
		ajustH1();
	};
}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById('root');
	rootElem.style.display = 'flex';
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

function buildShowSelector(allShows) {
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
	document.querySelector('.similar-shows-top-line > h2').textContent =
		'You also may like';
	returnButton.style.display = 'inline-block';
	document.querySelector('.show-selector-desc').style.display = 'block';

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

	// Shuffle
	shuffle(uniqueRandomNumberArray);

	// Render similar shows

	renderShowRow(similarShows, allShowsList);
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

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let temp = arr[i];
		let randomNumber = Math.floor(Math.random() * (i + 1));
		arr[i] = arr[randomNumber];
		arr[randomNumber] = temp;
	}
	return arr;
}

function renderShowRow(similarShows, allShowsList) {
	let similarShowsWrapper = document.querySelector('.similar-shows-wrapper');
	similarShowsWrapper.textContent = '';

	let uniqueRandomNumberArray = [];

	// Filling array for similar shows
	for (let i = 0; i < similarShows.length; i++) {
		uniqueRandomNumberArray.push(i);
	}
	// Shuffle
	shuffle(uniqueRandomNumberArray);

	for (let i = 0; i < 7; i++) {
		let similarShowsItem = document.createElement('div');
		similarShowsItem.className = 'similar-shows-item';
		similarShowsWrapper.append(similarShowsItem);

		let similarShowNumber = uniqueRandomNumberArray[i];

		similarShowsItem.addEventListener('click', () => {
			makePageForSelectedShow(similarShows[similarShowNumber].id, allShowsList);
			getAllEpisodes(similarShows[similarShowNumber].id);
		});

		let similarShowImg = document.createElement('img');
		similarShowImg.className = 'similar-show-img';

		if (similarShows[similarShowNumber].image == undefined) {
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

function prepareShowListArr(showList) {
	let uniqueRandomNumberArray = [];

	// Filling array for similar shows
	for (let i = 0; i < showList.length; i++) {
		uniqueRandomNumberArray.push(i);
	}
	// Shuffle
	shuffle(uniqueRandomNumberArray);

	let newArr = [];

	for (let i = 0; i < showList.length; i++) {
		newArr.push(showList[uniqueRandomNumberArray[i]]);
	}

	return newArr;
}

// This function renders list of show that is being passed as 'showList' argument.
function renderShows(showList, allShowsList) {
	let contentInner = document.querySelector('.content-inner');

	for (let i = 0; i < showList.length; i++) {
		let show = document.createElement('div');
		show.className = 'content-item';
		contentInner.append(show);

		let posterBox = document.createElement('div');
		posterBox.className = 'show-poster-box';
		show.append(posterBox);

		let img = document.createElement('img');
		img.className = 'show-poster';
		img.addEventListener('click', () => {
			makePageForSelectedShow(showList[i].id, allShowsList);
		});

		if (!(showList[i].image == undefined)) {
			img.src = showList[i].image.medium;
		} else {
			img.src =
				'https://media.movieassets.com/static/images/items/movies/posters/ddab5e00987cfdfff04a16cb470ca339.jpg';
		}
		posterBox.append(img);

		let showInfo = document.createElement('div');
		showInfo.className = 'show-info-content';
		show.append(showInfo);

		let showInfoInner = document.createElement('div');
		showInfoInner.className = 'show-info-inner';
		showInfo.append(showInfoInner);

		let showNameWrap = document.createElement('div');
		showNameWrap.className = 'show-name-wrap';
		showInfoInner.append(showNameWrap);

		let showName = document.createElement('h2');
		showName.className = 'show-name';
		showName.textContent = showList[i].name;
		showNameWrap.append(showName);
		showName.addEventListener('click', () => {
			makePageForSelectedShow(showList[i].id, allShowsList);
		});

		let genres = document.createElement('div');
		genres.className = 'list-of-genres-near-name';
		showNameWrap.append(genres);
		genres.textContent = '';
		for (let j = 0; j < showList[i].genres.length; j++) {
			let genre = document.createElement('span');
			genre.textContent = showList[i].genres[j];
			genre.className = 'genre-tag-searching-result';
			genres.append(genre);
		}

		let statusRatingRuntime = document.createElement('div');
		statusRatingRuntime.className = 'status-rating-runtime';
		showInfoInner.append(statusRatingRuntime);

		let status = document.createElement('span');
		status.className = 'show-status';
		status.textContent = 'Status: ' + showList[i].status;
		statusRatingRuntime.append(status);

		let rating = document.createElement('span');
		rating.className = 'show-rating';
		rating.textContent = 'Rating: ' + showList[i].rating.average;
		statusRatingRuntime.append(rating);

		if (!(showList[i].runtime == null)) {
			let runtime = document.createElement('span');
			runtime.className = 'show-runtime';
			runtime.textContent = 'Runtime: ' + showList[i].runtime + ' min';
			statusRatingRuntime.append(runtime);
		}

		let showSummary = document.createElement('div');
		showSummary.className = 'show-summary';
		showSummary.innerHTML = showList[i].summary;
		showInfoInner.append(showSummary);

		if (showSummary.textContent.length > 350) {
			showSummary.textContent = showSummary.textContent.substr(0, 350);
			let readMore = document.createElement('span');
			readMore.textContent = 'read more';
			readMore.style.color = 'white';
			readMore.style.textDecoration = 'underline';
			readMore.style.cursor = 'pointer';
			showSummary.append('... ');
			showSummary.append(readMore);
			readMore.addEventListener('click', () => {
				makePageForSelectedShow(showList[i].id, allShowsList);
				getAllEpisodes(showList[i].id);
			});
		}

		let whatchButton = document.createElement('button');
		whatchButton.classList = 'button more-button';
		whatchButton.textContent = 'Watch now';
		showInfo.append(whatchButton);

		whatchButton.addEventListener('click', () => {
			makePageForSelectedShow(showList[i].id, allShowsList);
		});

		// // Making hover effect
		// show.addEventListener('mouseenter', () => {
		// 	// whatchButton.style.display = 'inline';
		// 	// show.style.background =
		// 	// 	'linear-gradient(180deg, rgb(37, 43, 56), rgb(20, 25, 37) 100%)';
		// 	show.classList.toggle('show-background');
		// });
		// show.addEventListener('mouseleave', () => {
		// 	// whatchButton.style.display = 'none';
		// 	// show.style.background = 'none';
		// 	show.classList.toggle('show-background');
		// });
	}
}

function makePageForSelectedShow(showId, allShows) {
	showSelector.value = showId;

	//Geting current show for finding bg

	let newAllShows = allShows.filter((show) => {
		if (show.id == showId) {
			return true;
		}
	});
	let currentShow = newAllShows[0];

	let currentShowObject = backgroundImages.filter((bgShow) => {
		return bgShow.id == currentShow.id;
	});

	let defaultBackground = 'https://i.ibb.co/ZGTZH8R/k-LAVl-croper-ru.jpg';
	let currentShowBackgroundUrl;
	if (!(currentShowObject.length == 0) || currentShowObject == undefined) {
		currentShowBackgroundUrl = currentShowObject[0].url;
	} else {
		currentShowBackgroundUrl = defaultBackground;
	}

	let promiseFunction = function (currentShowBackgroundUrl) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.src = currentShowBackgroundUrl;
			let imgPoster = new Image();
			imgPoster.src = currentShow.image.original;
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
			window.scrollTo({
				top: 0,
				behavior: 'instant',
			});
			document.querySelector('.slider-wrap').style.display = 'none';
			document.querySelector('.show-info-wrap').style.display = 'block';

			document.getElementById('root').innerHTML = '';

			filter.style.display = 'block';
			// document.querySelector('.selector-box').style.display = 'block';
			document.querySelector('#orResult').style.display = 'block';
			document.querySelector('.search-box').style.display = 'block';
			document.querySelector('.episode-selector button').style.display =
				'inline-block';
			content.style.display = 'none';

			renderCurrentShow(currentShow, currentShowBackgroundUrl);
			makeSimilarShowList(currentShow, allShows, currentShowBackgroundUrl);
			getAllEpisodes(showId);
		},
		(error) => {
			console.log(error);
		}
	);
}

const backgroundImages = [
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
		name: 'Planet Earth',
		url: 'https://i0.wp.com/image.tmdb.org/t/p/w780/dFiK4HA16HSc8U6TCjKskU17Scb.jpg',
	},
	{
		id: 169,
		name: 'Breaking Bad',
		url: 'https://f.vividscreen.info/soft/7388ad061cef8c3c8addad40c0c9223c/Breaking-Bad-New-Season-1280x800.jpg',
	},
	{
		id: 179,
		name: 'The Wire',
		url: 'https://delagarde.nl/cache/i/1000/image/1225.w1024.9f8961b.4e63337.q80.jpg',
	},
	{
		id: 180,
		name: 'Firefly',
		url: 'https://lordsofgaming.net/wp-content/uploads/2020/12/Firefly-reboot-lords-of-gaming.jpg',
	},
	{
		id: 204,
		name: 'Stargate SG-1',
		url: 'https://www.desktopbackground.org/download/1280x1024/2013/04/30/568875_stargate-project-de_1920x1080_h.jpg',
	},
	{
		id: 565,
		name: 'Deadwood',
		url: 'https://img.wallpapersafari.com/desktop/1440/900/71/9/Y6kfgW.jpg',
	},
	{
		id: 523,
		name: 'The West Wing',
		url: 'https://www.reviews.org/au/app/uploads/2020/09/west-wing.jpg',
	},
	{
		id: 527,
		name: 'The Sopranos',
		url: 'https://picfiles.alphacoders.com/295/295477.jpg',
	},
	{
		id: 748,
		name: 'Oz',
		url: 'https://www.serialchic.it/wp-content/uploads/2016/11/oz.jpg',
	},
	{
		id: 1910,
		name: 'Bron / Broen',
		url: 'https://ic.pics.livejournal.com/qq21/31448256/376083/376083_original.jpg',
	},
	{
		id: 396,
		name: 'Gravity Falls',
		url: 'https://simkl.net/fanart/65/6515226f5a47d7cb_0.jpg',
	},
	{
		id: 335,
		name: 'Sherlock',
		url: 'https://look.com.ua/pic/201710/1280x768/look.com.ua-248980.jpg',
	},
	{
		id: 251,
		url: 'https://www.enligto.se/wp-content/uploads/2015/11/downtown-abbey-spoilers-on-google-1024x576.jpg',
		name: 'Downton Abbey',
	},
	{
		id: 216,
		url: 'https://cdn.vashurok.ru/system/news/images/000/005/054/og/d22bc9eedf12e32f5a1f654ab18c7c66.jpg?1613387105',
		name: 'Rick and Morty',
	},
	{
		id: 82,
		url: 'https://pbs.twimg.com/media/D6-kSYXWkAIlyxZ.jpg',
		name: 'Game of Thrones',
	},
	{
		id: 1339,
		url: 'http://images1.fanpop.com/images/image_uploads/Sharp-Compassion-2x04-wire-in-the-blood-1180741_1024_576.jpg',
		name: 'Wire in the Blood',
	},
	{
		id: 3167,
		url: 'https://cdn.idntimes.com/content-images/community/2018/09/2f2583fda237ea9f0f078f13dde39223.jpg',
		name: 'Yong Pal',
	},
	{
		id: 166,
		url: 'https://www.tvinsider.com/wp-content/uploads/2017/09/battlestar-galactica_9s1GjF-1014x570.jpg',
		name: 'Battlestar Galactica',
	},
	{
		id: 3327,
		url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_04/1190621/dick-van-dyke-mary-tyler-moor-today-170126-tease-01.jpg',
		name: 'The Dick Van Dyke Show',
	},
	{
		id: 677,
		url: 'https://mtdata.ru/u15/photo2C04/20466379008-0/original.jpg',
		name: 'Rome',
	},
	{
		id: 663,
		url: 'https://img.myflixer.to/xxrz/1200x600/201/ae/fa/aefad84a8cf0f9517df3edec604fd6f4/aefad84a8cf0f9517df3edec604fd6f4.jpg',
		name: 'The Shield',
	},
	{
		id: 3392,
		url: 'https://trikky.ru/wp-content/blogs.dir/1/files/2020/10/20/the-originals-5-season-promo.jpg',
		name: 'Les T??moins',
	},
	{
		id: 538,
		url: 'https://www.themoviedb.org/t/p/w1000_and_h563_face/ubFM3JrH3p6BtCHWAlOuboC1obg.jpg',
		name: 'Futurama',
	},
	{
		id: 1505,
		url: 'https://pbs.twimg.com/media/EuC7J23VgAATv6D.jpg',
		name: 'One Piece',
	},
	{
		id: 3704,
		url: 'http://1.bp.blogspot.com/-FtLw217X_DM/Uwbo3-lUjAI/AAAAAAAACq4/40eBe0YUwe8/w1200-h630-p-k-no-nu/my+love+from+another+stars.jpg',
		name: 'My Love from Another Star',
	},
	{
		id: 118,
		url: 'https://www.themoviedb.org/t/p/w1000_and_h563_face/rScuTLhg1v1ZSUlloMymbjTuAeI.jpg',
		name: 'House',
	},
	{
		id: 32,
		url: 'http://www.tvmaze.com/shows/32/fargo',
		name: 'Fargo',
	},
];

window.onload = makeHomePage;
