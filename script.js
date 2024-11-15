let myLibrary = [
  {
    title: "book1",
    author: "author1",
    year: "1995",
    numberOfPages: "15",
    read: true,
  },
  {
    title: "book2",
    author: "author2",
    year: "1997",
    numberOfPages: "25",
    read: false,
  },
];

function Book(title, author, year, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

addBookEventListener();
displayBooks();

function addBookEventListener() {
  const addBookButton = document.getElementById("btn-addBook");

  addBookButton.addEventListener("click", () => {
    displayAddBookForm();
  });
}

function displayAddBookForm() {
  const dialog = document.querySelector("dialog");

  const addBookForm = document.querySelector("#addBookForm");
  const title = addBookForm.querySelector("#addBookForm-title");
  const author = addBookForm.querySelector("#addBookForm-author");
  const year = addBookForm.querySelector("#addBookForm-year");
  const pages = addBookForm.querySelector("#addBookForm-pages");
  const read = addBookForm.querySelector("#addBookForm-read");

  dialog.showModal();

  dialog.addEventListener(
    "click",
    (event) => {
      if (event.target === dialog) {
        addBookForm.reset();
        dialog.close();
      }
    },
    { once: true }
  );

  addBookForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      addBookToLibrary(title.value, author.value, year.value, pages.value, read.checked);
      dialog.close();
      addBookForm.reset();
    },
    { once: true }
  );
}

function addBookToLibrary(title, author, year, numberOfPages, read) {
  const newBook = new Book(title, author, year, numberOfPages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById("libraryContainer");
  libraryContainer.replaceChildren();

  for (let bookIndex = 0; bookIndex < myLibrary.length; bookIndex++) {
    titleValue = myLibrary[bookIndex]["title"];
    authorValue = myLibrary[bookIndex]["author"];
    yearValue = myLibrary[bookIndex]["year"];
    pagesValue = myLibrary[bookIndex]["numberOfPages"];
    readValue = myLibrary[bookIndex]["read"] === true ? "Already read" : "Not read yet";
    const newBookDiv = document.createElement("div");
    newBookDiv.classList.add("bookContainer");

    newBookDiv.insertAdjacentHTML(
      "beforeend",
      "<p> Title: " +
        titleValue +
        "<p> Author: " +
        authorValue +
        "<p> Year of release: " +
        yearValue +
        "<p> Pages: " +
        pagesValue +
        "<p> Read: " +
        readValue +
        '<p class="bookActions"><button class="btn btn-delete" data-book-index="' +
        bookIndex +
        '" type="button">Delete</button>' +
        '<button class="btn btn-status" data-book-index="' +
        bookIndex +
        '" type="button">Status</button>'
    );

    libraryContainer.appendChild(newBookDiv);
  }

  addDeleteButtonsEventListener();
  addStatusButtonsEventListener();
}

function addStatusButtonsEventListener() {
  const statusButtons = Array.from(document.getElementsByClassName("btn-status"));

  statusButtons.forEach((button) => {
    const bookIndex = button.getAttribute("data-book-index");

    button.addEventListener(
      "click",
      () => {
        toggleBookStatus(bookIndex);
      },
      { once: true }
    );
  });
}

function toggleBookStatus(bookIndex) {
  const book = myLibrary[bookIndex];

  book.read = !book.read;

  displayBooks();
}

function addDeleteButtonsEventListener() {
  const deleteButtons = Array.from(document.getElementsByClassName("btn-delete"));

  deleteButtons.forEach((button) => {
    const bookIndex = button.getAttribute("data-book-index");

    button.addEventListener(
      "click",
      () => {
        deleteBookFromLibrary(bookIndex);
      },
      { once: true }
    );
  });
}

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

//closing form adds book in array
//fix layout when many items
//refactor code for clarity
