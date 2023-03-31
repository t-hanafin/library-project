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
    {
        title:      'Orlando',
        author:     'Virginia Woolf',
        pages:      321,
        read:       false,
    },
    {
        title:      'Don Quixote',
        author:     'Miguel de Cervantes',
        pages:      924,
        read:       true,
    },
    {
        title:      'Our Aesthetic Categories',
        author:     'Sianne Ngai',
        pages:      501,
        read:       true,
    },
    {
        title:      'The Second Sex',
        author:     'Simone de Beauvoir',
        pages:      629,
        read:       true,
    },
];

// Grabs relevant HTML elements for use. 

const table = document.querySelector('#library-table')
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

// Add event listener to close with escape key.

bookForm.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        popUpForm.style.display = 'none';
    }
});

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
    let formRead = document.getElementById('read').checked;
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
    })
}

// Adds one new book to the end of the table
// without redrawing the whole table. 

function updateTable() {
    var latestBook = myLibrary.slice(-1);
    var index = myLibrary.findIndex(x => x.author === latestBook[0].author && 
        x.title === latestBook[0].title);
    populateRow(latestBook[0], index);
}

// Returns a new row for the table, with content 
// and relevant ids added to cells. 

function populateRow(item, index) {
    var row = table.insertRow(-1);
    var thisBook = Object.values(item);
    console.log(thisBook);
    for (i in thisBook) {
        console.log(thisBook[i]);
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

// Adds a read-status button to the table.

function addReadStatusButton(read, index, cell) {
    cell.id = `true-false ${index}`;
    let button = document.createElement('button');
    button.id = 'read-status';
    if (read) {
        button.textContent = "Read";
    } else {
        button.textContent = "Unread";
        button.style.backgroundColor = 'orange';
    };
    button.addEventListener('click', (e) => {
        e.preventDefault();
        readStatusToggle(read, index);
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
    const removedBook = myLibrary.splice(index, 1);
    populateTable();
}

// Shows what's in the library on load. 

populateTable();