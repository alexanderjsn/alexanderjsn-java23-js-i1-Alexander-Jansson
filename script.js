// api
const apiKey = 'b89807eb08b8124fbb7f608b7511d1a0';

let circle = document.getElementById('circle');
const homepageCover = document.getElementById('homepage-cover');
const coverpageImages = document.getElementById('coverpage-images');

async function coverImage(url){
    const moviePoster = await fetchData(url);
    const random = Math.floor(Math.random() * 10);
    const coverMovie = moviePoster.results[random];
        circle.style.backgroundImage = 'url(https://image.tmdb.org/t/p/w500' + coverMovie.poster_path + ')';

    let coverTitle = document.createElement('h2');
    coverTitle.id = 'cover-title';
    coverTitle.innerText = coverMovie.title;
    homepageCover.appendChild(coverTitle);


    let coverText = document.createElement('p');
    coverText.id = 'cover-text';
    coverText.innerText = coverMovie.overview;	
    homepageCover.appendChild(coverText);

    for(let i = 0; i < 5; i++){
    const coverImages = moviePoster.results[i];
    const coverImg = document.createElement('img');
    coverImg.className = 'cover-img';
    coverImg.src = "https://image.tmdb.org/t/p/w500" + coverImages.poster_path;
    coverpageImages.appendChild(coverImg);
    
}
}

// funktion som hämtar all data

export async function fetchData(url){
    try{
        // begär data från url/en get request
        const response = await fetch(url);
        //hämtar data till json
        if(response.ok){
            const data = await response.json();
            //returnerar datan baserat på url när metoden kallas
            return data;
        } else{
            // returnerar olika errors baserar på statuskod
            switch(response.status){
                case 401: 
                    console.log("API ERROR. Check API key. Code: " + response.status);
                    let errorText = document.createElement('p');
                    errorText.innerText = 'Server error. Try again later.';
                    errorText.classList.add('errorMessage');
                    homepageCover.appendChild(errorText);
                    throw new Error('API error');
                
                case 404:
                    console.log("Network not found. Code: " + response.status);
                    errorText.innerText = 'Network could not be found. Try again later.';
                    homepageCover.appendChild(errorText);
                    throw new Error('Not found');

                case 500:
                    errorText.innerText = 'Server error. Try again later.';
                    homepageCover.appendChild(serverError);
                    console.log("Server error. Code: " + response.status);
                    throw new Error('Server error');
        
                case 429:
                    console.log("Too many requests. Code: " + response.status);
                    errorText.innerText = 'Too many requests. Please wait a moment before sending another.';
                    homepageCover.appendChild(errorText);
                    throw new Error('Too many requests. Please wait a moment before sending another.');

                default:
                    throw new Error(`Something went wrong: ${response.status}`);
            }
        }

    } catch(error){
        throw new Error(`Could not load data ${response.status}`)
    }
}


coverImage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);



