const myLibrary = [];
const bookDisplay = document.querySelector(".book-display");
const addNewBookDialog = document.querySelector("#newBookDialog");
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const formNewBook = document.querySelector("#formNewBook");

// Dialog form inputs
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRead = document.querySelector("#bookRead");

class Book {
  #_title;
  #_author;
  #_pages;
  #_read;

  constructor(title, author, pages, read) {
    this.#_title = title;
    this.#_author = author;
    this.#_pages = pages;
    this.#_read = read;
    this.info = () => {
      let msg_output = `${this.#_title} by ${this.#_author}, ${
        this.#_pages
      } pages, `;
      msg_output += this.#_read ? "read" : "not read yet";
      return msg_output;
    };
    this.toggleRead = () => (this.#_read = !this.#_read);
  }

  get title() {
    return this.#_title;
  }

  set title(value) {
    this.#_title = value;
  }

  get author() {
    return this.#_author;
  }

  set author(value) {
    this.#_author = value;
  }

  get pages() {
    return this.#_pages;
  }

  set pages(value) {
    this.#_pages = value;
  }

  get read() {
    return this.#_read;
  }

  set read(value) {
    this.#_read = value;
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

  let bookAuthorListItem = document.createElement("li");
  bookAuthorListItem.textContent = `Author: ${book.author}`;
  bookCardContent.appendChild(bookAuthorListItem);

  let bookPagesListItem = document.createElement("li");
  bookPagesListItem.textContent = `Pages: ${book.pages}`;
  bookCardContent.appendChild(bookPagesListItem);

  let bookReadListItem = document.createElement("li");
  bookReadListItem.textContent = `Read: ${book.read}`;
  bookCardContent.appendChild(bookReadListItem);

  let btnRemoveBook = document.createElement("button");
  let btnToogleRead = document.createElement("button");

  btnRemoveBook.textContent = "Remove";
  btnRemoveBook.setAttribute("data-index-array", index);
  btnRemoveBook.addEventListener("click", (e) => {
    myLibrary.splice(e.target.getAttribute("data-index-array"), 1);
    printBooks();
  });

  btnToogleRead.setAttribute("data-index-array", index);

  if (book.read) {
    btnToogleRead.textContent = "Mark unread";
  } else {
    btnToogleRead.textContent = "Mark read";
  }

  btnToogleRead.addEventListener("click", (e) => {
    myLibrary[e.target.getAttribute("data-index-array")].toggleRead();
    printBooks();
  });

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
  bookTitle.value = null;
  bookAuthor.value = null;
  bookPages.value = null;
  bookRead.checked = false;
}

function removeBook(book) {
  myLibrary.splice;
}

const newBookPlaceholder = document.createElement("div");
newBookPlaceholder.classList.add("card");
newBookPlaceholder.classList.add("card-placeholder");
const addNewBookButton = document.createElement("button");
addNewBookButton.id = "showAddBookDialog";
addNewBookButton.textContent = "New Book +";
addNewBookButton.addEventListener("click", () => {
  resetAddBookForm();
  addNewBookDialog.showModal();
});
newBookPlaceholder.appendChild(addNewBookButton);

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addNewBookDialog.close();
});

bookTitle.addEventListener("input", (e) => {
  if (bookTitle.validity.valueMissing) {
    bookTitle.setCustomValidity("Title is required.");
  } else {
    bookTitle.setCustomValidity("");
  }
});

bookAuthor.addEventListener("input", (e) => {
  if (bookAuthor.validity.valueMissing) {
    bookAuthor.setCustomValidity("Author is required.");
  } else {
    bookAuthor.setCustomValidity("");
  }
});

bookPages.addEventListener("input", (e) => {
  if (bookPages.validity.valueMissing) {
    bookPages.setCustomValidity("Total pages is required.");
  } else if (
    bookPages.validity.rangeOverflow ||
    bookPages.validity.rangeUnderflow
  ) {
    bookPages.setCustomValidity(
      `Total pages should be between ${bookPages.min} and ${bookPages.max}; you entered ${bookPages.value}.`
    );
  } else {
    bookPages.setCustomValidity("");
  }
});

formNewBook.addEventListener("submit", () => {
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );
  addBookToLibrary(newBook);
  printBooks();
  addNewBookDialog.close();
});

// Create Card placeholder for adding a new book
bookDisplay.appendChild(newBookPlaceholder);
