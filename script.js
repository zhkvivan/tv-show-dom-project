//You can edit ALL of the code here
function setup() {
	const allEpisodes = getAllEpisodes();
	makePageForEpisodes(allEpisodes);

	let searchBoxInput = document.getElementById('searchBoxInput');
	searchBoxInput.addEventListener('keyup', () => {

	});
}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById('root');
	// rootElem.textContent = `Got ${episodeList.length} episode(s)`;

	rootElem.style.color = '#2b2b2b';
	rootElem.style.display = 'flex';
	rootElem.style.flexDirection = 'row';
	rootElem.style.justifyContent = 'space-evenly';
	rootElem.style.flexWrap = 'wrap';

	rootElem.style.maxWidth = '1170px';
	rootElem.style.margin = '0 auto';
	rootElem.style.paddingTop = '50px';

	episodeList.forEach((episode) => {
		let cardWrapper = document.createElement('div');
		rootElem.append(cardWrapper);
		cardWrapper.className = 'card-wrapper';
		cardWrapper.style.width = '300px';
		cardWrapper.style.height = '550px';
		cardWrapper.style.margin = '0 20px 30px 20px'
		cardWrapper.style.boxShadow = '0px 0px 38px -20px rgba(34, 60, 80, 0.56)';

		let episodeWrapper = document.createElement('div');
		cardWrapper.append(episodeWrapper);
		episodeWrapper.className = 'episode-wrapper';
		episodeWrapper.style.minHeight = '80px';
		episodeWrapper.style.padding = '0 20px';
		episodeWrapper.style.borderBottom = '2px solid #e8e8e8';
		episodeWrapper.style.display = 'flex';
		episodeWrapper.style.flexDirection = 'column';
		episodeWrapper.style.justifyContent = 'center';
		episodeWrapper.style.alignItems = 'center';
		episodeWrapper.style.fontSize = '18px';
		episodeWrapper.style.fontWeight = 'bold'

		let episodeWrapperContent = document.createElement('div');
		episodeWrapper.append(episodeWrapperContent);
		episodeWrapperContent.style.textAlign = 'center';

		let episodeName = document.createElement('span');
		episodeWrapperContent.append(episodeName);
		episodeName.textContent = episode.name;

		let episodeSeasonNumber = document.createElement('span');
		episodeWrapperContent.append(episodeSeasonNumber);
		if (episode.season > 9) {
			episodeSeasonNumber.textContent = ` - S${episode.season}`;
		} else episodeSeasonNumber.textContent = ` - S0${episode.season}`;

		let episodeNumber = document.createElement('span');
		episodeWrapperContent.append(episodeNumber);
		if (episode.number > 9) {
			episodeNumber.textContent = `E${episode.number}`;
		} else episodeNumber.textContent = `E0${episode.number}`;

		let episodeImage = document.createElement('img');
		cardWrapper.append(episodeImage);
		episodeImage.src = episode.image.medium;
		episodeImage.style.width = '100%'

		let episodeDescription = document.createElement('p');
		cardWrapper.append(episodeDescription);
		episodeDescription.innerHTML = episode.summary;
		episodeDescription.style.padding = '0 30px'
	});
}

window.onload = setup;
