'use-strict'

const buttontodo = document.querySelector('.button-todo');
const form = document.querySelector('.form');
const overlay = document.querySelector('.overlay');
const btnx = document.querySelector('.close');
const btnsubmit = document.getElementById('btn-form');
const formtodo= document.querySelector('form');
const namainput = document.getElementById('nama');
const jabataninput = document.getElementById('jabatan');
const textinput = document.getElementById('todo-text');
const levelinput = document.getElementById('todo-level-dropdown');

// function untuk menampilkan / menghilangkan overlay dan form todo
const openhidden = function() {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closehidden = function() {
    form.classList.add('hidden');
    overlay.classList.add('hidden');
};

// tanggal sekarang
const today = new Date();
const f = new Intl.DateTimeFormat('en-gb', {
    dateStyle: 'long',
})

// function untuk memasukan obj ke array

let number = 0;

let todo = [];

const addtodo = function(){
    const todoobj = {
        id: number,
        nama: namainput.value.trim(),
        jabatan: jabataninput.value.trim(),
        text: textinput.value.trim(),
        level: levelinput.value,
        tanggal: f.format(today),
        aktif: 0,
    };
     
    todo.push(todoobj);
    console.log(todo);
    number += 1;
};

// function untuk membuat table
// const createtodoitem = function()



// membuat tombol interaktif menampilkan dan menutup form
buttontodo.addEventListener('click', openhidden);

overlay.addEventListener('click', closehidden);

btnx.addEventListener('click', closehidden);

document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && !form.classList.contains('hidden')) {
        closehidden();
    }
});


// submit form
formtodo.addEventListener('submit', function(e) {
    e.preventDefault();
    addtodo();
    closehidden()
});



