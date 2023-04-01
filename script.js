let myLibrary = [
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
];

// Grabs relevant HTML elements for use. 

const tableHeaderRow = document.querySelector('thead');
const table = document.querySelector('#library-table');
const bookForm = document.querySelector('#library-form');
const container = document.querySelector('.container');
const popUpForm = document.getElementById('popUp');

// Button to reveal the book-entry form.

let addBookButton = document.createElement('button');
addBookButton.id = 'show-form';
addBookButton.textContent = "Add a book to your library.";
addBookButton.addEventListener('click', (e) => {
    popUpForm.style.display = 'block';
    document.getElementById('book-title').focus();
})
container.appendChild(addBookButton);

// Form-button to conceal book-entry form.

let hideFormButton = document.createElement('button');
hideFormButton.textContent = "Close form";
hideFormButton.addEventListener('mousedown', (e) => {
    popUpForm.style.display = 'none';
});
bookForm.appendChild(hideFormButton);

// Add event listener to form to allow close with escape key.

bookForm.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
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

// Adds book to library, calls updateTable function.

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook)
    updateTable();
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
    myLibrary.forEach(item => {
        var index = myLibrary.findIndex(x => x.author === item.author && 
            x.title === item.title);
        populateRow(item, index);
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

function populateRow(item, index) {
    var row = table.insertRow(-1);
    var thisBook = Object.values(item);
    for (i in thisBook) {
        var cell = row.insertCell(i);
        if (typeof thisBook[i] === 'boolean') {
            addReadStatusButton(thisBook[i], index, cell);
        } else if (typeof thisBook[i] === 'string' || 'number') {
            cell.textContent = thisBook[i];
        }
    }
    var removeButtonCell = row.insertCell(Object.keys(item).length);
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
        readStatusToggle(status, index);
    })
    document.getElementById(cell.id).appendChild(button);
}

// Adds a 'remove book' button to the table.

function addRemoveBookButton(index) {
    let button = document.createElement('button');
    button.id = 'remove-button';
    button.textContent = 'Remove';
    button.data = index;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        removeItem(index);
    })
    document.getElementById(`remove ${index}`).appendChild(button);
}

// Changes status of a book in the library, then refreshes the table.

function readStatusToggle(status, index) {
    if (status) {
        myLibrary[index].status = false;
    } else {
        myLibrary[index].status = true;
    }
    populateTable();
}

// Removes a book from the library, refreshes the table.
function removeItem(index) {
    const removedBook = myLibrary.splice(index, 1);
    populateTable();
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

populateTable();