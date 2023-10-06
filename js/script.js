const myLibrary = [];
const bookDisplay = document.querySelector(".book-display");

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        let msg_output = `${this.title} by ${this.author}, ${this.pages} pages, `
        msg_output += this.read ? 'read' : 'not read yet'
        return msg_output
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(new Book("Book 1", "Author 1", 14, false));
addBookToLibrary(new Book("Book 2", "Author 2", 24, false));
addBookToLibrary(new Book("Book 3", "Author 3", 100, true));

function printBooks() {
    for (let book of myLibrary) {
        let bookNode = document.createElement("div");
        bookNode.classList.add("card");
        bookNode.textContent = book.info();
        bookDisplay.appendChild(bookNode);
    }
}

printBooks();