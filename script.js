const API_KEY = 'api_key=a5f190b935351d73b88a5f818aec7c11'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'
const searchURL = BASE_URL + '/search/movie?' + API_KEY


const main = document.getElementById("main")
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)

        showMovies(data.results)
    })
}

function showMovies(data){
    main.innerHTML = ''

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <div class="container">
                <img src="${IMG_URL + poster_path}" alt='${title}'>

                <div class="film-title">
                    <h1>${title}</h1>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>

                <div class="film-info">
                    <h2>Overview</h2>

                    <p>${overview}</p>
                </div>
            </div>
        
        `

    main.appendChild(movieEl)
    })
}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }
    else if(vote >= 5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTherm = search.value
    if(searchTherm){
        getMovies(searchURL + '&query=' + searchTherm)
    }
})

