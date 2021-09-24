function makeHomePage() {
	let showInfo = document.querySelector('.show-info');
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

	let allShows = getAllShows();
	buildShowSelector(allShows);

	// let uniqueRandomNumberArray = [];
	let uniqueNumbersArray = [];

	// // Filling array for similar shows
	// for (let i = 0; i < allShows.length; i++) {
	// 	uniqueRandomNumberArray.push(i);
	// }

	for (let i = 0; i < allShows.length; i++) {
		uniqueNumbersArray.push(i);
	}

	// // Shuffle
	// shuffle(uniqueRandomNumberArray);

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
		getAllEpisodes(currentShowId);
	});

	returnButton.addEventListener('click', () => {
		document.querySelector('.show-info').style.display = 'none';
		let popularShowsHeader = document.querySelector(
			'.similar-shows-top-line > h2'
		);
		popularShowsHeader.textContent = 'Popular TV-Shows';
		showSelector.value = 'chooseAShow';
		filter.style.display = 'none';
		root.textContent = '';
		content.style.display = 'block';
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
		let alphabetBox = document.querySelector('.alphabet-box');
		let filteredShows;

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
			numberOfShows.textContent = '33';
			item.append(numberOfShows);

			item.addEventListener('click', () => {
				if (item.getAttribute('pressed') == 'false') {
					// Реализация механизма переключения
					let allLetters = document.querySelectorAll('.alphabet-item');
					Array.from(allLetters).forEach((item) => {
						item.setAttribute('pressed', 'false');
						item.style.backgroundColor = '#0c142b';
						item.style.color = '#449ee0';
					});

					item.setAttribute('pressed', 'true');

					// Выделение цветом чтоб было понятно что буква выбрана
					item.style.backgroundColor = '#17e69d';
					item.style.color = '#151735';

					// Получение массива сериалов на определенную букву для рендера
					let filteredShowsByLetter;
					if (letter.textContent == '0-9') {
						let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
						filteredShowsByLetter = allShows.filter((show) => {
							if (
								numbersArray.some((number) => {
									if (number == Array.from(show.name)[0]) {
										return true;
									}
								})
							) {
								return true;
							}
						});
					} else {
						filteredShowsByLetter = allShows.filter((show) => {
							if (letter.textContent == Array.from(show.name)[0]) {
								return true;
							}
						});
					}

					filteredShows = filteredShowsByLetter;

					// Обработка случая если нет сериалов на такую букву
					document.querySelector('.content-inner').textContent = '';
					if (filteredShows.length == 0) {
						let span = document.createElement('span');
						span.className = 'empty-message';
						span.textContent =
							'Sorry, we have nothing to show you. Try to filter different way';
						document.querySelector('.content-inner').append(span);
					} else {
						renderedShowsArray = [];
						renderShows(filteredShows, allShows, renderedShowsArray);
					}
				} else {
					// Обработка в случае клика на ту же букву для снятия фильтра
					item.setAttribute('pressed', 'false');
					item.style.backgroundColor = '#0c142b';
					item.style.color = '#449ee0';

					document.querySelector('.content-inner').textContent = '';
					renderedShowsArray = [];
					renderShows(allShows, allShows, renderedShowsArray);
				}
			});
		}
	}

	let allShowsForRender = prepareShowListArr(allShows);
	let renderedShowsArray = [];
	renderShows(allShowsForRender, allShows);
	// console.log(renderedShowsArray);

	buildShowFilter();
	buildShowSearch(allShows, allShowsForRender);
}

function buildShowSearch(allShows, renderedShowsArray) {
	let searchResultArray = [];
	showSearchInput.addEventListener('keyup', () => {
		// console.log(renderedShowsArray);

		searchResultArray = renderedShowsArray.filter((show) => {
			if (
				show.name.toLowerCase().includes(showSearchInput.value.toLowerCase())
			) {
				return true;
			}
		});
		document.querySelector('.content-inner').textContent = '';
		console.log(searchResultArray);
		renderShows(searchResultArray, allShows);
	});
}

function renderCurrentShow(show, currentShowBackgroundUrl) {
	// Render currernt show details in the header
	let header = document.querySelector('.header');

	header.style.background = `linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(34,30,143,0.2595413165266106) 100%), url('${currentShowBackgroundUrl}') top/cover `;

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

	// Checking width
	// if (matchMedia) {
	// 	let screen = window.matchMedia('(max-width: 1560px)');
	// 	screen.addListener(changes);
	// 	changes(screen);
	// }
	// function changes(screen) {
	// 	if (screen.matches) {
	// 	}
	// }

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
	for (let i = 0; i < allShowsList.length; i++) {
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

		if (similarShows[similarShowNumber].image == null) {
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

function renderShows111(showList, allShowsList, newArr) {
	let contentInner = document.querySelector('.content-inner');

	let uniqueRandomNumberArray = [];

	// Filling array for similar shows
	for (let i = 0; i < showList.length; i++) {
		uniqueRandomNumberArray.push(i);
	}
	// Shuffle
	shuffle(uniqueRandomNumberArray);

	// newArr = [];
	for (let i = 0; i < showList.length; i++) {
		newArr.push(showList[uniqueRandomNumberArray[i]]);

		let show = document.createElement('div');
		show.className = 'content-item';
		contentInner.append(show);

		let posterBox = document.createElement('div');
		posterBox.className = 'show-poster-box';
		show.append(posterBox);

		let img = document.createElement('img');
		img.className = 'show-poster';

		if (!(showList[uniqueRandomNumberArray[i]].image == undefined)) {
			img.src = showList[uniqueRandomNumberArray[i]].image.medium;
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

		let showName = document.createElement('h2');
		showName.className = 'show-name';
		showName.textContent = showList[uniqueRandomNumberArray[i]].name;
		showInfoInner.append(showName);

		let genres = document.createElement('div');
		showInfoInner.append(genres);
		genres.textContent = '';
		for (
			let j = 0;
			j < showList[uniqueRandomNumberArray[i]].genres.length;
			j++
		) {
			let genre = document.createElement('span');
			genre.textContent = showList[uniqueRandomNumberArray[i]].genres[j];
			genre.className = 'genre-tag';
			genres.append(genre);
		}

		let showSummary = document.createElement('div');
		showSummary.className = 'show-summary';
		showSummary.innerHTML = showList[uniqueRandomNumberArray[i]].summary;
		showInfoInner.append(showSummary);

		if (showSummary.textContent.length > 350) {
			showSummary.textContent = showSummary.textContent.substr(0, 350);
			let readMore = document.createElement('a');
			readMore.textContent = 'read more';
			readMore.href = '#';
			readMore.style.color = 'white';
			showSummary.append('... ');
			showSummary.append(readMore);
		}

		let whatchButton = document.createElement('button');
		whatchButton.classList = 'button more-button';
		whatchButton.textContent = 'Watch now';
		showInfo.append(whatchButton);

		whatchButton.addEventListener('click', () => {
			makePageForSelectedShow(
				showList[uniqueRandomNumberArray[i]].id,
				allShowsList
			);
			getAllEpisodes(showList[uniqueRandomNumberArray[i]].id);
		});

		// Making hover effect
		show.addEventListener('mouseenter', () => {
			whatchButton.style.display = 'inline';
			show.style.background =
				'linear-gradient(90deg, rgb(37, 43, 56), rgb(20, 25, 37) 100%)';
		});
		show.addEventListener('mouseleave', () => {
			whatchButton.style.display = 'none';
			show.style.boxShadow = 'none';
			show.style.background = 'none';
		});
	}
	newArr = 5;
	console.log(newArr);
}

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

		let showName = document.createElement('h2');
		showName.className = 'show-name';
		showName.textContent = showList[i].name;
		showInfoInner.append(showName);

		let genres = document.createElement('div');
		showInfoInner.append(genres);
		genres.textContent = '';
		for (
			let j = 0;
			j < showList[i].genres.length;
			j++
		) {
			let genre = document.createElement('span');
			genre.textContent = showList[i].genres[j];
			genre.className = 'genre-tag';
			genres.append(genre);
		}

		let showSummary = document.createElement('div');
		showSummary.className = 'show-summary';
		showSummary.innerHTML = showList[i].summary;
		showInfoInner.append(showSummary);

		if (showSummary.textContent.length > 350) {
			showSummary.textContent = showSummary.textContent.substr(0, 350);
			let readMore = document.createElement('a');
			readMore.textContent = 'read more';
			readMore.href = '#';
			readMore.style.color = 'white';
			showSummary.append('... ');
			showSummary.append(readMore);
		}

		let whatchButton = document.createElement('button');
		whatchButton.classList = 'button more-button';
		whatchButton.textContent = 'Watch now';
		showInfo.append(whatchButton);

		whatchButton.addEventListener('click', () => {
			makePageForSelectedShow(
				showList[i].id,
				allShowsList
			);
			getAllEpisodes(showList[i].id);
		});

		// Making hover effect
		show.addEventListener('mouseenter', () => {
			whatchButton.style.display = 'inline';
			show.style.background =
				'linear-gradient(90deg, rgb(37, 43, 56), rgb(20, 25, 37) 100%)';
		});
		show.addEventListener('mouseleave', () => {
			whatchButton.style.display = 'none';
			show.style.boxShadow = 'none';
			show.style.background = 'none';
		});
	}
}

function makePageForSelectedShow(showId, allShows) {
	window.scrollTo({
		top: 0,
		behavior: 'instant',
	});

	document.querySelector('.show-info').style.display = 'flex';

	document.getElementById('root').innerHTML = '';

	filter.style.display = 'block';
	document.querySelector('.selector-box').style.display = 'block';
	document.querySelector('#orResult').style.display = 'block';
	document.querySelector('.search-box').style.display = 'block';
	document.querySelector('.episode-selector button').style.display =
		'inline-block';

	content.style.display = 'none';

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
			renderCurrentShow(currentShow, currentShowBackgroundUrl);
			makeSimilarShowList(currentShow, allShows, currentShowBackgroundUrl);
		},
		(error) => {
			console.log(error);
		}
	);
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
		name: 'Les Témoins',
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
