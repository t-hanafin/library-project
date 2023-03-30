let myLibrary = [
    {
        title:      'Americanah',
        author:     'Chimamanda Ngozi Adichie',
        pages:      402,
        read:       true
    },
    {
        title:      'In the Skin of a Lion',
        author:     'Michael Ondaatje',
        pages:      250,
        read:       true
    },
    {
        title:      'Moon of the Crusted Snow',
        author:     'Waubgeshig Rice',
        pages:      231,
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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // True or false.
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook)
    updateDisplay();
}

function checkForDuplicate(title, author, pages, read) {
    // Checks to see if the book-to-be-added is already in the library.
    // Does not add book if it's already in the library.

    myLibrary.some(book => book.title === title && book.author === author) ?
        undefined :
        addBookToLibrary(title, author, pages, read);
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formTitle = bookForm.elements[0].value;
    let formAuthor = bookForm.elements[1].value;
    let formPages = parseInt(bookForm.elements[2].value);
    let formRead = document.getElementById('read1').checked;
    checkForDuplicate(formTitle, formAuthor, formPages, formRead);
});

function populateDisplay() {
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

function updateDisplay() {
    var latestBook = myLibrary.slice(-1);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = latestBook[0].title; 
    cell2.textContent = latestBook[0].author; 
    cell3.textContent = latestBook[0].pages;
    cell4.textContent = latestBook[0].read;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    table.appendChild(row);
}

populateDisplay();