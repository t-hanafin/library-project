let initialLibrary = [
    {
        title:      'In the Skin of a Lion',
        author:     'Michael Ondaatje',
        pages:      250,
        status:     true,
    },
    {
        title:      'In the Skin of a Lion',
        author:     'Michael Ondaatje',
        pages:      250,
        status:     true,
    },
    {
        title:      'Orlando',
        author:     'Virginia Woolf',
        pages:      321,
        status:     false,
    },
    {
        title:      'Americanah',
        author:     'Chimamanda Ngozi Adichie',
        pages:      402,
        status:     true,
    },
    {
        title:      'Moon of the Crusted Snow',
        author:     'Waubgeshig Rice',
        pages:      231,
        status:     false,
    },
]

let myLibrary = [];

// Grabs relevant HTML elements for use. 

const tableHeaderRow = document.querySelector('thead');
const table = document.querySelector('#library-table');
const bookForm = document.querySelector('#library-form');
const popUpForm = document.getElementById('pop-up');

// Add event listener to close the popUpForm with escape key.

window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        popUpForm.style.display = 'none';
    }
});

// Book object.

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status; // True or false.
}

// Adds a function to each book to toggle read status.

Book.prototype.toggleReadStatus = function() {
    if (this.status) {
        this.status = false;
    } else {
        this.status = true;
    }
}

// Adds book to library.

function addBookToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook)
}

// Pulls books from the initial library array, adds them to myLibrary array.

const populateMyLibrary = (array) => {
    array.forEach(item => {
        checkForDuplicate(item.title, item.author) ? 
        undefined : 
        addBookToLibrary(item.title, item.author, item.pages, item.status);
    });
}

// Checks if the book-to-be-added is already in the library.

function checkForDuplicate(title, author) {
    myLibrary.some(book => book.title === title && book.author === author) ?
        duplicate = true :
        duplicate = false;
    return duplicate;
}

// Takes input from form, checks if it's a duplicate
// warns if it is a duplicate, adds to the library, closes
// book entry form. 

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForDuplicate(bookForm.elements[0].value, bookForm.elements[1].value);
    if (!duplicate) {
         addBookToLibrary(
            bookForm.elements[0].value, 
            bookForm.elements[1].value, 
            bookForm.elements[2].value, 
            document.getElementById('read').checked
        );

        popUpForm.style.display = 'none';
        updateTable();
    } else {
        alert("This book is already in your library.");
    }
});

// When called, adds every book in myLibrary to the HTML table.
// Also used to refresh the entire table.

function populateTable() {
    tableHeaderRow.innerHTML = '';
    table.innerHTML = '';
    populateTableHeaders();
    myLibrary.forEach(function callback(book, index) {
        populateRow(book, index);
    })
}

// Adds one new book to the end of the table
// without redrawing the whole table. 

function updateTable() {
    var latestBook = myLibrary.slice(-1);
    populateRow(latestBook[0], (myLibrary.length - 1));
}

// Returns a new row for the table, with content 
// and relevant ids added to cells. 

function populateRow(book, index) {
    var row = table.insertRow(-1);
    for (let value of (Object.values(book))) {
        let cell = row.insertCell(Object.values(book).indexOf(value));
        if (typeof value != 'boolean') {
            cell.textContent = value;
        } else {
            addReadStatusButton(value, index, cell);
        }
    }
    var removeButtonCell = row.insertCell(Object.keys(book).length);
    removeButtonCell.id = `remove ${index}`;
    addRemoveBookButton(index);
}

// Adds a 'read status' button to the table.

function addReadStatusButton(status, index, cell) {
    cell.id = `true-false ${index}`;
    let button = document.createElement('button');
    button.id = 'read-status';
    if (status) {
        button.textContent = "Read";
    } else {
        button.textContent = "Unread";
        button.style.backgroundColor = 'orange';
    };
    button.addEventListener('click', (e) => {
        e.preventDefault();
        myLibrary[index].toggleReadStatus();
        populateTable();
    })
    document.getElementById(cell.id).appendChild(button);
}

// Adds a 'remove book' button to the table.

function addRemoveBookButton(index) {
    let button = document.createElement('button');
    button.id = 'remove-button';
    button.textContent = 'Remove';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        removeItem(index);
    })
    document.getElementById(`remove ${index}`).appendChild(button);
}

// Removes a book from the library, refreshes the table.

removeItem = (index) => {
    if (window.confirm("Press OK if you're sure you want to delete this book.")) {
        myLibrary.splice(index, 1);
        populateTable();
    }
}

// Populates the header row.

function populateTableHeaders(item, index) {
    var row = tableHeaderRow.insertRow(-1);
    var headers = Object.keys(myLibrary[0])
    for (i in headers) {
        var header = document.createElement('th');
        header.textContent = `${headers[i]}`;
        row.appendChild(header);
    }
    var removeHeader = document.createElement('th')
    removeHeader.textContent = "Remove";
    row.appendChild(removeHeader);
}

populateMyLibrary(initialLibrary);
populateTable();