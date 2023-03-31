let myLibrary = [
    {
        title:      'Americanah',
        author:     'Chimamanda Ngozi Adichie',
        pages:      402,
        read:       true,
        index:      0,
    },
    {
        title:      'In the Skin of a Lion',
        author:     'Michael Ondaatje',
        pages:      250,
        read:       true,
        index:      1,
    },
    {
        title:      'Moon of the Crusted Snow',
        author:     'Waubgeshig Rice',
        pages:      231,
        read:       true,
        index:      2,
    },
];

const table = document.querySelector('#table');
const bookForm = document.querySelector('#library_form');

let row = document.createElement('tr');
let cell1 = document.createElement('td');
let cell2 = document.createElement('td');
let cell3 = document.createElement('td');
let cell4 = document.createElement('td');
let cell5 = document.createElement('td');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // True or false.
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    newBook.index = generateNewIndex();
    myLibrary.push(newBook)
    updateDisplay();
}

function generateNewIndex() {
    var lastBook = myLibrary.slice(-1);
    return newIndex = parseInt(lastBook[0].index + 1);
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
        var cell5 = row.insertCell(4);
        cell1.textContent = (item.title);
        cell2.textContent = (item.author);
        cell3.textContent = (item.pages);
        cell4.id = `true-false ${item.index}`;
        cell5.id = `${item.index}`;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        table.appendChild(row);
        addRemoveButton(item.index);
        addTrueFalseToggle(item.read, item.index);
    })
}

function updateDisplay() {
    var latestBook = myLibrary.slice(-1);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.textContent = latestBook[0].title; 
    cell2.textContent = latestBook[0].author; 
    cell3.textContent = latestBook[0].pages;
    cell4.textContent = latestBook[0].read;
    cell4.id = 'true-false';
    cell5.id = latestBook[0].index;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    table.appendChild(row);
    addRemoveButton(latestBook[0].index);
}

function addRemoveButton(index) {
    let button = document.createElement('button');
    button.id = 'remove-button';
    button.textContent = 'Remove';
    button.data = index;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`the index number is: ${button.data}`);
    })
    document.getElementById(index).appendChild(button);
}

function addTrueFalseToggle(read, index) {
    let button = document.createElement('button');
    button.id = 'true-false';
    button.textContent = `${read}`;
    button.data = read;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`the value is ${read}`);
    })
    document.getElementById(`true-false ${index}`).appendChild(button);
}


populateDisplay();