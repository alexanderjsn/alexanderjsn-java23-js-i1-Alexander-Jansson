// hämtar knapparna
const buttons = document.getElementsByClassName('movie-buttons');
const apiKey = 'b89807eb08b8124fbb7f608b7511d1a0';


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        let value = this.value;
        fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        //metod calls här
    })
}

async function fetchData(url){
    try{
        // begär data från url/en get request
        const response = await fetch(url);
        //hämtar data till json
        if(response.ok){
            const data = await response.json();
            //returnerar när metoden kallas
            console.log(data);
            alert(data);
            return data;
        }
    

    } catch(error){
        console.log(error);
    }
}