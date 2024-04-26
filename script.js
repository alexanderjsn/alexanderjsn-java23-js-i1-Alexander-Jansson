// hämtar knapparna
const buttons = document.getElementsByClassName('movie-buttons');
const apiKey = 'b89807eb08b8124fbb7f608b7511d1a0';
let userInput;
const movieDiv = document.getElementById('movie-text');
const rankedBtn = document.getElementById('ranked');
const popularBtn = document.getElementById('popular');

// funktion som skapar UI baserat på URL som tas in i parameter
async function buildUI(url){

    //hämtar datan 
const movieData = await fetchData(url);

movieData.results.forEach(movie => {
    let h2 = document.createElement('h2');
    h2.innerText = movie.title;
    movieDiv.appendChild(h2);
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
