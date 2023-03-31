let myLibrary = [
    {
        title:      'Americanah',
        author:     'Chimamanda Ngozi Adichie',
        pages:      402,
        read:       true,
    },
    {
        title:      'Moon of the Crusted Snow',
        author:     'Waubgeshig Rice',
        pages:      231,
        read:       false,
    },
    {
        title:      'In the Skin of a Lion',
        author:     'Michael Ondaatje',
        pages:      250,
        read:       true,
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
    myLibrary.push(newBook)
    updateTable();
}

// Checks if the book-to-be-added is already in the library.
// Does not add book if it's already in the library.

function checkForDuplicate(title, author) {
    myLibrary.some(book => book.title === title && book.author === author) ?
        duplicate = true :
        duplicate = false;
    return duplicate;
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formTitle = bookForm.elements[0].value;
    let formAuthor = bookForm.elements[1].value;
    let formPages = parseInt(bookForm.elements[2].value);
    let formRead = document.getElementById('read1').checked;
    checkForDuplicate(formTitle, formAuthor);
    if (!duplicate) {
        addBookToLibrary(formTitle, formAuthor, formPages, formRead);
    }
});

// Adds every book in myLibrary to the HTML table.

function populateTable() {
    myLibrary.forEach(item => {
        var index = myLibrary.findIndex(x => x.author === item.author && 
            x.title === item.title);
        populateRow(item, index);
        addRemoveButton(index);
        addTrueFalseButton(item.read, index);
    })
}

// Adds one new book to the end of the table
// without redrawing the whole table. 

function updateTable() {
    var latestBook = myLibrary.slice(-1);
    var index = myLibrary.findIndex(x => x.author === latestBook[0].author && 
        x.title === latestBook[0].title);
    populateRow(latestBook[0], index);
    addRemoveButton(index);
    addTrueFalseButton(latestBook[0].read, index);
}

function populateRow(item, index) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.textContent = item.title;
    cell2.textContent = item.author;
    cell3.textContent = item.pages;
    cell4.id = `true-false ${index}`;
    cell5.id = `${index}`;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    table.appendChild(row);
}

function addRemoveButton(index) {
    let button = document.createElement('button');
    button.id = 'remove-button';
    button.textContent = 'Remove';
    button.data = index;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`the index number is: ${button.data}`);
        // removeItem(index);
    })
    document.getElementById(index).appendChild(button);
}

function addTrueFalseButton(read, index) {
    let button = document.createElement('button');
    button.id = 'true-false';
    if (read) {
        button.textContent = 'This means it is true.';
    } else {
        button.textContent = 'This means it is false.';
    }
    button.data = read;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        trueFalseToggle(read, index, button);
    })
    document.getElementById(`true-false ${index}`).appendChild(button);
}

function trueFalseToggle(read, index, button) {
    if (read) {
        myLibrary[index].read = false;
        updateTrueFalseButton(button, false);
    } else {
        myLibrary[index].read = true;
    }
}

function updateTrueFalseButton(button, read) {
    button.innerHTML = "";
    button.id = 'true-false';
    if (read) {
        button.textContent = 'This means it is true.';
    } else {
        button.textContent = 'This means it is false.';
    }
    button.data = read;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        trueFalseToggle(read, index);
    })
}

populateTable();