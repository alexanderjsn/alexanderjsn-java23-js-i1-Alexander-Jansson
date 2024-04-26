// hämtar knapparna
const buttons = document.getElementsByClassName('movie-buttons');
const apiKey = 'b89807eb08b8124fbb7f608b7511d1a0';
let userInput;
const movieDiv = document.getElementById('movie-text');
const movieHeader = document.getElementById('movie-header');
const movieImage = document.getElementById('movie-images');

const rankedBtn = document.getElementById('ranked');
const popularBtn = document.getElementById('popular');

// funktion som skapar UI baserat på URL som tas in i parameter
async function buildUI(url){

    //hämtar datan 
const movieData = await fetchData(url);
const tenMovies = movieData.results.slice(0,10);

tenMovies.forEach(movie => {
    // Skapar h2 element (title)
    let h2 = document.createElement('h2');
    h2.innerText = movie.title;
    h2.id = 'title';
    movieHeader.appendChild(h2);
    // Skapar h3 element (release date)
    let h3 = document.createElement('h3');
    h3.innerText = movie.release_date;
    h3.id = 'release-date';
    movieHeader.appendChild(h3);
    //skapar img element (poster)
    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;
    movieHeader.appendChild(img);
    //skapar paragraf (beskrivning)
    let paragraph = document.createElement('paragraph');
    paragraph.id = 'description';
    paragraph.innerText = movie.overview;
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
            console.log(data);
        }
    

    } catch(error){
        console.log(error);
    }
}

rankedBtn.addEventListener('click', async function(){
    buildUI(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
})
popularBtn.addEventListener('click', async function(){
    fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
})
