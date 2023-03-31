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

// Grabs relevant HTML elements for use. 

const table = document.querySelector('#library-table')
const bookForm = document.querySelector('#library-form');
const container = document.querySelector('.container');
const popUpForm = document.getElementById('popUp');

// Button to reveal the book-entry form.

let showForm = document.createElement('button');
showForm.id = 'show-form';
showForm.textContent = "Add a book to your library.";
showForm.addEventListener('click', (e) => {
    popUpForm.style.display = 'block';
    document.getElementById('book-title').focus();
})
container.appendChild(showForm);

// Form-button to conceal book-entry form.

let hideButton = document.createElement('button');
hideButton.textContent = "Close form";
hideButton.addEventListener('mousedown', (e) => {
    popUpForm.style.display = 'none';
});
bookForm.appendChild(hideButton);

// Add event listener to close with escape key.

bookForm.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        popUpForm.style.display = 'none';
    }
});

// Template table elements.

let row = document.createElement('tr');
let cell1 = document.createElement('td');
let cell2 = document.createElement('td');
let cell3 = document.createElement('td');
let cell4 = document.createElement('td');
let cell5 = document.createElement('td');

// Book object.

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // True or false.
}

// Adds book to library, updates the table to display new book.

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

// Takes input from form, validates it, checks if it's a duplicate
// warns if it is a duplicate, adds to the library, closes
// book entry form. 

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formTitle = bookForm.elements[0].value;
    let formAuthor = bookForm.elements[1].value;
    let formPages = parseInt(bookForm.elements[2].value);
    let formRead = document.getElementById('read1').checked;
    checkForDuplicate(formTitle, formAuthor);
    if (!duplicate) {
        addBookToLibrary(formTitle, formAuthor, formPages, formRead);
        popUpForm.style.display = 'none';
    } else {
        alert("This book is already in your library.");
    }
});

// When called, adds every book in myLibrary to the HTML table.
// Also used to refresh the entire table.

function populateTable() {
    table.innerHTML = '';
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

// Returns a new row for the table, with content 
// and relevant ids added to cells. 

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
    cell5.id = `remove ${index}`;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    table.appendChild(row);
}

// Adds a remove-book button to the table.

function addRemoveButton(index) {
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

// Adds a read-status button to the table.

function addTrueFalseButton(read, index) {
    let button = document.createElement('button');
    button.id = 'read-status';
    if (read) {
        button.textContent = "Read.";
    } else {
        button.textContent = "Not read.";
        button.style.backgroundColor = 'orange';
    };
    button.addEventListener('click', (e) => {
        e.preventDefault();
        readStatusToggle(read, index);
    })
    document.getElementById(`true-false ${index}`).appendChild(button);
}

// Toggles the read-status button by changing read-status
// of a book in the library, then refreshes the table.

function readStatusToggle(read, index) {
    if (read) {
        myLibrary[index].read = false;
    } else {
        myLibrary[index].read = true;
    }
    populateTable();
}

// Removes a book from the library, refreshes the table.
function removeItem(index) {
    if (index === 0) {
        const placeholderLibrary = myLibrary.shift();
    } else {
        const placeholderLibrary = myLibrary.splice(index, index);
    }
    populateTable();
}

// Shows what's in the library on load. 

populateTable();