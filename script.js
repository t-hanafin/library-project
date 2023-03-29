const container = document.querySelector('#container');
const content = document.createElement('div');
content.classList.add('content');

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

addBookToLibrary('poo', 'pee', 9, false);
addBookToLibrary('crap', 'fart', 10, false);
addBookToLibrary('silly', 'fanonsenrt', 11, false);
addBookToLibrary('nonsense', 'caca', 12, false);
addBookToLibrary('foo', 'bar', 13, true);
addBookToLibrary('duh', 'buh', 14, false);

console.table(myLibrary);

const testForm = document.querySelector('#library_form');

testForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(testForm);
  
    console.log("Form Data");
    for (let obj of formData) {
        console.log(obj);
        content.textContent = obj;
        container.appendChild(content);
    }
  };