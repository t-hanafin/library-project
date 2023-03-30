const container = document.querySelector('#container');
const content = document.createElement('div');
content.classList.add('content');
let renderedRecord = '';



let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read // True or false.
}

function addBookToLibrary(title, author, pages, read) {
    let newTitle = title
    let newAuthor = author
    let newPages = pages
    let newRead = read
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary('Americanah', 'Chimamanda Ngozi Adichie', 402, true);
addBookToLibrary('In The Skin of a Lion', 'Michael Ondaatje', 250, true);

console.table(myLibrary);

const bookForm = document.querySelector('#library_form');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formTitle = bookForm.elements[0].value;
    let formAuthor = bookForm.elements[1].value;
    let formPages = parseInt(bookForm.elements[2].value);
    let formRead = bookForm.elements[3].value;
    if (formRead === 'true') {
        formRead = true;
    } else {
        formRead = false;
    }
    addBookToLibrary(formTitle, formAuthor, formPages, formRead);
    updateDisplay();
});

const table = document.querySelector('#table');
let row = document.createElement('tr');
let cell1 = document.createElement('td');
let cell2 = document.createElement('td');
let cell3 = document.createElement('td');
let cell4 = document.createElement('td');


function updateDisplay() {

    myLibrary.forEach(item => {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.textContent = (item[Object.keys(item)[0]]);
        cell2.textContent = (item[Object.keys(item)[1]]);
        cell3.textContent = (item[Object.keys(item)[2]]);
        cell4.textContent = (item[Object.keys(item)[3]]);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        table.appendChild(row);
        console.log(cell1.innerText);
    })
}


updateDisplay();