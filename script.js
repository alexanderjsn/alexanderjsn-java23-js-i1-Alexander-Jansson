// hämtar knapparna
const buttons = document.getElementsByClassName('movie-buttons');
const apiKey = 'b89807eb08b8124fbb7f608b7511d1a0';
let userInput;
const rankedBtn = document.getElementById('ranked');
const popularBtn = document.getElementById('popular');

// funktion som skapar UI baserat på URL som tas in i parameter
async function buildUI(url){
const movieData = await fetchData(url);
alert(movieData.title);
console.log(movieData);
console.log(movieData.title);
}


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
