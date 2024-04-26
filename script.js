// hämtar knapparna
const buttons = document.getElementsByClassName('movie-buttons');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        let value = this.value;
        alert(value);
    })
}

