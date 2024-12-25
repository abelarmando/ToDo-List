'use-strict'

const buttontodo = document.querySelector('.button-todo');
const form = document.querySelector('.form');
const overlay = document.querySelector('.overlay');

// function untuk menampilkan / menghilangkan overlay dan form todo
const openhidden = function() {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closehidden = function() {
    form.classList.add('hidden');
    overlay.classList.add('hidden');
}

buttontodo.addEventListener('click', openhidden);

overlay.addEventListener('click', closehidden)
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && !form.classList.contains('hidden')) {
        closehidden();
    }
    console.log(e.key);
});



