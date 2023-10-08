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
    this.toggleRead = function () {
        this.read = !this.read;
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

    for (let i = 0; i < myLibrary.length; i++) {
        let bookCard = createHTMLCard(myLibrary[i], i);
        bookDisplay.appendChild(bookCard);
    }

    // Create Card placeholder for adding a new book
    bookDisplay.appendChild(newBookPlaceholder);
}

function createHTMLCard(book, index) {
    let bookCard = document.createElement("div");
    let bookCardHeader = document.createElement("div");
    let bookCardBody = document.createElement("div");
    let bookCardFooter = document.createElement("div");
    let bookCardTitle = document.createElement("p");
    let bookCardContent = document.createElement("ul");

    bookCard.classList.add("card");
    bookCardHeader.classList.add("card-header");
    bookCardBody.classList.add("card-body");
    bookCardFooter.classList.add("card-footer");

    bookCardTitle.textContent = book.title;

    for (const [key, value] of Object.entries(book)) {
        if (typeof value !== "function") {
            let bookItem = document.createElement("li");
            bookItem.textContent = `${key}: ${value}`;
            bookCardContent.appendChild(bookItem);
        }
    }

    let btnRemoveBook = document.createElement("button");
    let btnToogleRead = document.createElement("button");

    btnRemoveBook.textContent = "Remove";
    btnRemoveBook.setAttribute("data-index-array", index);
    btnRemoveBook.addEventListener("click", (e) => {
        myLibrary.splice(e.target.getAttribute("data-index-array"), 1);
        printBooks();
    })

    btnToogleRead.setAttribute("data-index-array", index);

    if (book.read) {
        btnToogleRead.textContent = "Mark unread";
    } else {
        btnToogleRead.textContent = "Mark read";
    }

    btnToogleRead.addEventListener("click", (e) => {
        myLibrary[e.target.getAttribute("data-index-array")].toggleRead();
        printBooks();
    })

    bookCardHeader.appendChild(bookCardTitle);
    bookCardBody.appendChild(bookCardContent);
    bookCardFooter.appendChild(btnRemoveBook);
    bookCardFooter.appendChild(btnToogleRead);
    bookCard.appendChild(bookCardHeader);
    bookCard.appendChild(bookCardBody);
    bookCard.appendChild(bookCardFooter);
    return bookCard;
}

function resetAddBookForm() {
    bookTitle.textContent = null;
    bookAuthor.textContent = null;
    bookPages.textContent = null;
    bookRead.checked = false;
}

function removeBook(book) {
    myLibrary.splice
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
    printBooks();
    addNewBookDialog.close();
})

// Create Card placeholder for adding a new book
bookDisplay.appendChild(newBookPlaceholder);