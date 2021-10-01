// let prevBtn = document.querySelector('.prev-btn');
// let nextBtn = document.querySelector('.next-btn');



let prevSlide;
let currentSlide;
let nextSlide;

let slides = Array.from(document.querySelectorAll('.slider-item'));

let showsForSlider = [
	{
		id: 1216,
		name: 'Bosch',
		bgUrl: 'http://athpod.com/wp-content/uploads/2019/01/bosch_drama.jpg',
		year: 2014,
		genres: ['Drama', 'Crime', 'Mystery'],
	},
	{
		id: 118,
		name: 'House',
		bgUrl: 'https://oir.mobi/uploads/posts/2020-01/1578279530_1-2.jpg',
		year: 2004,
		genres: ['Drama', 'Mystery', 'Medical'],
	},
	{
		id: 2,
		name: 'Person of Interest',
		bgUrl: 'https://cdn.hipwallpaper.com/i/86/58/yO7f9Y.jpg',
		year: 2011,
		genres: ['Action', 'Crime', 'Science-Fiction'],
	},
	{
		id: 1825,
		name: 'The Expanse',
		bgUrl:
			'https://wallpapershome.com/images/wallpapers/the-expanse-1920x1080-best-tv-series-8272.jpg',
		year: 2015,
		genres: ['Action', 'Thriller'],
	},
];

function fillSlider() {
	for (let i = 0; i < slides.length; i++) {
		// Set show name
		slides[i].querySelector('h1').textContent = showsForSlider[i].name;
		// Get and set genres string
		let genresString = '';
		for (let j = 0; j < showsForSlider[i].genres.length; j++) {
			genresString += showsForSlider[i].genres[j] + ' | ';
		}
		genresString = genresString.substring(0, genresString.length - 3);
		slides[i].querySelector('.about-show-on-slide').textContent = genresString;

		// Set button 
		let button = slides[i].querySelector('button');
		button.addEventListener('click', () => {
			makePageForSelectedShow(showsForSlider[i].id, allShows);
			getAllEpisodes(showsForSlider[i].id);
		})
		// Set bg
		slides[
			i
		].style.background = `url(${showsForSlider[i].bgUrl}) top / cover no-repeat`;

		// Set toggles bg's
		firstSlideToggle.forEach((toggle) => {
			toggle.style.background = `url(${showsForSlider[0].bgUrl}) center / cover no-repeat`;
		});
		secondSlideToggle.forEach((toggle) => {
			toggle.style.background = `url(${showsForSlider[1].bgUrl}) center / cover no-repeat`;
		});
		thirdSlideToggle.forEach((toggle) => {
			toggle.style.background = `url(${showsForSlider[2].bgUrl}) center / cover no-repeat`;
		});
		fourthSlideToggle.forEach((toggle) => {
			toggle.style.background = `url(${showsForSlider[3].bgUrl}) center / cover no-repeat`;
		});
	}
}

function selectToggle(toggle, slideClass) {
	toggle.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			slides.forEach((slide) => {
				slide.classList.remove('current-slide');
			});
			document.querySelector(slideClass).classList.add('current-slide');
		});
	});
}

let firstSlideToggle = document.querySelectorAll('.first-slide-toggle');
selectToggle(firstSlideToggle, '.first-slide');

let secondSlideToggle = document.querySelectorAll('.second-slide-toggle');
selectToggle(secondSlideToggle, '.second-slide');

let thirdSlideToggle = document.querySelectorAll('.third-slide-toggle');
selectToggle(thirdSlideToggle, '.third-slide');

let fourthSlideToggle = document.querySelectorAll('.fourth-slide-toggle');
selectToggle(fourthSlideToggle, '.fourth-slide');

// nextBtn.addEventListener('click', () => {
// 	console.log('next btn clicked');
// 	slideToRight();
// });

// prevBtn.addEventListener('click', () => {
// 	console.log('prev btn clicked');
// 	slideToLeft();
// });

function defineSlides() {
	for (let i = 0; i < slides.length; i++) {
		if (slides[i].classList.contains('current-slide')) {
			currentSlide = slides[i];
			// Getting next slide
			if (i + 1 == slides.length) {
				nextSlide = slides[0];
			} else {
				nextSlide = slides[i + 1];
			}
			// Gettin previous slide
			if (i - 1 < 0) {
				prevSlide = slides[slides.length - 1];
			} else {
				prevSlide = slides[i - 1];
			}
		}
	}
}

function slideToRight() {
	defineSlides();
	currentSlide.classList.remove('current-slide');
	nextSlide.classList.add('current-slide');
}

function slideToLeft() {
	defineSlides();
	currentSlide.classList.remove('current-slide');
	prevSlide.classList.add('current-slide');
}

fillSlider();
