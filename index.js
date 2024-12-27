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
const todocomplete = document.querySelector('.todo-complete');
const tenggatwaktu = document.querySelector('.tenggat-waktu');
const todooverdue = document.querySelector('.todo-overdue');



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

// ubah format tanggan ke english british
const f = new Intl.DateTimeFormat('en-gb', {
    dateStyle: 'long',
});


// function untuk memasukan obj ke array

let todo = opensavetodo();
updatetabel();

let number = 0;


function addtodo(){
    const deadline = new Date(tenggatwaktu.value);
    
    const todoobj = {
        id: number,
        nama: namainput.value.trim(),
        jabatan: jabataninput.value.trim(),
        text: textinput.value.trim(),
        level: levelinput.value,
        tanggal: f.format(today),
        tenggatwaktu: f.format(deadline),
        aktif: false,
        
    };

    todo.push(todoobj);

    
    savetodolist();
    updatetabel();

    namainput.value = '';
    jabataninput.value = '';
    textinput.value = '';
    number += 1;
};

let itemindex;
// console.log(itemindex);

// untuk update table
function updatetabel(){
    // untuk mereset innerhtml
    boxcard.innerHTML = '';
    todocomplete.innerHTML= '';
    todooverdue.innerHTML= '';
    
    todo.forEach((item, index) => {

            const newday = new Date(item.tanggal).getTime();
            const newdeadline = new Date(item.tenggatwaktu).getTime();

            const todoitem = createtodoitem(item, index);
            savetodolist();
            
            if (item.aktif === false && newdeadline >= newday) {
                boxcard.append(todoitem);
            } else  if(item.aktif === false && newdeadline < newday) {
                
                todooverdue.append(todoitem);
                
            } else {
                todocomplete.append(todoitem);
            }
            
    })
  
};


// function untuk membuat table
function createtodoitem(item, index) {
    const todotable = document.createElement('div');
    todotable.className = 'flex';
    todotable.innerHTML = `
    <div class="container-card">
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
                     <i class="fa-solid fa-trash delete-todo" id='${index}'></i>
                </div>                  
                    
            </div>

        </div>
    </div>
    `
    
    const btndelete = todotable.querySelector('.delete-todo');

    btndelete.addEventListener('click', function() {        

        deletetodolist(index);
         
    });

    const btncheck = todotable.querySelector('.fa-check');

    btncheck.addEventListener('click', function() {
        completedtodolist(item)
        
    })


    return todotable;

};

// untuk delete todolist array
function deletetodolist(todoindex) {
    todo = todo.filter((n, b) => b !== todoindex);
    savetodolist();
    updatetabel();
};

function completedtodolist(item) {
    item.aktif = true;
    
    savetodolist();
    updatetabel();
    
}


function savetodolist () {
    const todojson = JSON.stringify(todo)
    localStorage.setItem('todos', todojson);
}

function opensavetodo() {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}

