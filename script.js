// api
const apiKey = 'b89807eb08b8124fbb7f608b7511d1a0';

//div för filmerna
const movieHeader = document.getElementById('movie-header');

//knappar och input
const searchMovieBtn = document.getElementById('search-movie');
const searchPersonBtn = document.getElementById('search-person');
const rankedBtn = document.getElementById('ranked');
const popularBtn = document.getElementById('popular');
let circle = document.getElementById('circle');
let userInput = document.getElementById('user-input');


async function coverImage(url){
    circle.style.backgroundImage = null;
    const moviePoster = await fetchData(url);
    const coverMovie = moviePoster.results[0];
        circle.style.backgroundImage = 'url(https://image.tmdb.org/t/p/w500' + coverMovie.poster_path + ')';
}



// funktion som skapar UI baserat på URL som tas in i parameter
async function buildUI(url){
    movieHeader.innerHTML = '';

    //hämtar datan 
    
const movieData = await fetchData(url);
const tenMovies = movieData.results.slice(0,10);

tenMovies.forEach(movie => {    
    // Skapar h2 element (title)
    let h2 = document.createElement('h2');
    h2.innerText = movie.title || movie.name
    h2.id = 'title';
    movieHeader.appendChild(h2);
    // Skapar h3 element (release date)
    let h3 = document.createElement('h3');
    h3.innerText = movie.release_date || movie.known_for_department;
    h3.id = 'release-date';
    movieHeader.appendChild(h3);
    //skapar img element (poster)
    let img = document.createElement('img');

    // kollar först om det finns en profile_path i datan som hämtas, tar annars poster_path
    img.src = "https://image.tmdb.org/t/p/w500" + (movie.profile_path || movie.poster_path);

    // sätter in filmtitel eller kändisnamn som alt
    img.alt = 'image of ' + (movie.title || movie.name);
    img.onerror = function(){
        // tar in placeholder bild ifall ingen bild finns
        img.src='https://via.placeholder.com/150/0000ff/ffffff?text=No+Image+Available';
    };
    movieHeader.appendChild(img);
    //skapar paragraf (beskrivning)
    let paragraph = document.createElement('paragraph');
    paragraph.id = 'description';
    

    //iom att known_for är en Array så användS map för att iterera genom listan och sedan få ut titeln på varje film
    // sedan används .join(',') för att seperera titlarna med kommatecken
    paragraph.innerText = movie.overview || movie.known_for.map(movie => movie.title).join(', ');
    movieHeader.appendChild(paragraph);

    //stjärnor för popularitet?

    // en rund bild top 1 av rankade filmer

})}



async function fetchData(url){
    try{
        // begär data från url/en get request
        const response = await fetch(url);
        //hämtar data till json
        if(response.ok){
            const data = await response.json();
            //returnerar datan baserat på url när metoden kallas
            return data;
        }

    } catch(error){
        throw new Error(`Could not load data ${response.status}`)
    }
}

coverImage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

rankedBtn.addEventListener('click', async function(){
    buildUI(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
})
popularBtn.addEventListener('click', async function(){
    buildUI(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
})
searchMovieBtn.addEventListener('click', async function(){
    let searchInput = userInput.value;
    buildUI(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`);
})
searchPersonBtn.addEventListener('click', async function(){
    let searchInput = userInput.value;
    buildUI(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${searchInput}`);
})

