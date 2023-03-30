let myLibrary = [
    {
        title:      'Americanah',
        author:     'Chimamanda Ngozi Adichie',
        pages:      402,
        read:       true
    }
];

const table = document.querySelector('#table');
let row = document.createElement('tr');
let cell1 = document.createElement('td');
let cell2 = document.createElement('td');
let cell3 = document.createElement('td');
let cell4 = document.createElement('td');
const bookForm = document.querySelector('#library_form');

addBookToLibrary('In The Skin of a Lion', 'Michael Ondaatje', 250, true);
addBookToLibrary('Moon of the Crusted Snow', 'Waubgeshig Rice', 231, true);
    
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // True or false.
}

function addBookToLibrary(title, author, pages, read) {
    // Checks to see if the book-to-be-added is already in the library.
    // Does not add book if it's already in the library.

    myLibrary.some(book => book.title === title && book.author === author) ?
        undefined :
        myLibrary.push(newBook = new Book(title, author, pages, read));
}


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

function updateDisplay() {
    table.innerHTML = "";
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
    })
}

updateDisplay();