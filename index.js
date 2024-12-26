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
const boxcard = document.querySelector('.box-card');

// function untuk menampilkan / menghilangkan overlay dan form todo
const openhidden = function() {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closehidden = function() {
    form.classList.add('hidden');
    overlay.classList.add('hidden');
};


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

// tanggal sekarang
const today = new Date();
const f = new Intl.DateTimeFormat('en-gb', {
    dateStyle: 'long',
});

// function untuk memasukan obj ke array

let todo = [];

let number = 1;

function addtodo(){
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

    updatetabel();

    namainput.value = '';
    jabataninput.value = '';
    textinput.value = '';
    levelinput.value = 'low';

    number += 1;
};

// untuk update table
function updatetabel(){
    todo.forEach((item, index) => {
        const todoitem = createtodoitem(item, index);
        boxcard.append(todoitem);
    })
};

// function untuk membuat table
function createtodoitem(item, index) {
    const todotable = document.createElement('div');
    todotable.className = 'container-card';
    todotable.innerHTML = `
    <div class="todo-card" id = '${index}'>

                <div class="todo-level-tanggal">
                    <div class="level">
                        <h4>${item.level}</h4>
                    </div>
                    
                    <div class="tanggal">
                        <p>${item.tanggal}</p>
                    </div>
                </div>

                <div class="todo-text">
                    <p>${item.text}</p>
                </div>

                <div class="todo-nama-done-delete">

                <div class="nama">
                    <h4>${item.nama}</h4>
                    <p>${item.jabatan}</p>
                </div>

                <div class="trash-check">
                    <i class="fa-solid fa-check"></i>
                     <i class="fa-solid fa-trash"></i>
                </div>                  
                    
            </div>

        </div>
    `
    return todotable

};


