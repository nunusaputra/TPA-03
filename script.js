const API_KEY = 'api_key=a5cfa1884f34be09968e75137baa1420';
const MAIN_URL = 'https://api.themoviedb.org/3';
const API_URL = MAIN_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_URL = MAIN_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

apiFilm(API_URL)

function apiFilm(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        lihatFilm(data.results);
    })
}


function lihatFilm(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const film = document.createElement('div');
        film.classList.add('movie');
        film.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="date">
                <h4>${release_date}</h4>
            </div>

            <div class="overview">
                <h1>Overview</h1>
                ${overview}
            </div>
        
               
        `

        main.appendChild(film);
    })

}

function getColor(vote) {
    if(vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searcterm = search.value;

    if (searcterm) {
        apiFilm(SEARCH_URL+'&query='+searcterm)
    } else {
        apiFilm(API_URL);
    }
})