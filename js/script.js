const myLibrary = [];
const bookDisplay = document.querySelector(".book-display");
const addNewBookDialog = document.querySelector("#newBookDialog");
const confirmBtn = document.querySelector("#confirmBtn");

// Dialog form inputs
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRead = document.querySelector("#bookRead");

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

function printBooks() {
    // Remove books
    while (bookDisplay.hasChildNodes()) {
        bookDisplay.removeChild(bookDisplay.lastChild);
    }

    for (let book of myLibrary) {
        let bookCard = createHTMLCard(book);
        bookDisplay.appendChild(bookCard);
    }

    // Create Card placeholder for adding a new book
    bookDisplay.appendChild(newBookPlaceholder);
}

function createHTMLCard(book) {
    let bookCard = document.createElement("div");
    let bookCardHeader = document.createElement("div");
    let bookCardBody = document.createElement("div");
    let bookCardTitle = document.createElement("p");
    let bookCardContent = document.createElement("ul");

    bookCard.classList.add("card");
    bookCardHeader.classList.add("card-header");
    bookCardBody.classList.add("bookCardBody");

    bookCardTitle.textContent = book.title;

    for (const [key, value] of Object.entries(book)) {
        if (typeof value !== "function") {
            let bookItem = document.createElement("li");
            bookItem.textContent = `${key}: ${value}`;
            bookCardContent.appendChild(bookItem);
        }
    }

    bookCardHeader.appendChild(bookCardTitle);
    bookCardBody.appendChild(bookCardContent);
    bookCard.appendChild(bookCardHeader);
    bookCard.appendChild(bookCardBody);
    return bookCard;
}

function resetAddBookForm() {
    bookTitle.textContent = null;
    bookAuthor.textContent = null;
    bookPages.textContent = null;
    bookRead.checked = false;
}

const newBookPlaceholder = document.createElement("div");
newBookPlaceholder.classList.add("card");
newBookPlaceholder.classList.add("card-placeholder");

const addNewBookButton = document.createElement("button");
addNewBookButton.id = "showAddBookDialog";
addNewBookButton.textContent = "New Book +";
addNewBookButton.addEventListener("click", () => {
    addNewBookDialog.showModal();
});
newBookPlaceholder.appendChild(addNewBookButton);

addNewBookDialog.addEventListener("close", () => {
    resetAddBookForm();
})

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    addBookToLibrary(newBook);
    createHTMLCard(newBook);
    printBooks();
    addNewBookDialog.close();
})

// Create Card placeholder for adding a new book
bookDisplay.appendChild(newBookPlaceholder);