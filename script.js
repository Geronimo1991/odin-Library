let myLibrary = [];

function Book(title, author, year, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

displayBooks();
displayAddBookButton();

function displayAddBookButton() {
  let container = document.getElementById("addBookButtonContainer");
  container.innerHTML = '<button class="btn btn-addBook" id="btn-addBook">Add Book</button>';

  addBookEventListener();
}

function addBookEventListener() {
  const addBookButton = document.getElementById("btn-addBook");

  addBookButton.addEventListener("click", () => {
    displayAddBookForm();
  });
}

function displayAddBookForm() {
  const dialog = document.querySelector("dialog");
  const closeBtn = dialog.querySelector("#close-btn");

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
        dialog.close();
      }
    },
    { once: true }
  );

  closeBtn.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      dialog.close();
      addBookForm.reset();
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
  createBooksTable();
  let table = document.getElementById("booksTable");

  for (let bookIndex = 0; bookIndex < myLibrary.length; bookIndex++) {
    let row = table.insertRow(bookIndex + 1);

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let yearCell = row.insertCell(2);
    let numberOfPagesCell = row.insertCell(3);
    let readCell = row.insertCell(4);
    let actionsCell = row.insertCell(5);

    titleCell.innerText = myLibrary[bookIndex]["title"];
    authorCell.innerText = myLibrary[bookIndex]["author"];
    yearCell.innerText = myLibrary[bookIndex]["year"];
    numberOfPagesCell.innerText = myLibrary[bookIndex]["numberOfPages"];

    if (myLibrary[bookIndex]["read"] === true) {
      readCell.innerText = "Already read";
    } else {
      readCell.innerText = "Not read yet";
    }

    actionsCell.innerHTML =
      '<button class="btn btn-delete" data-book-index="' +
      bookIndex +
      '" type="button"> <span>icon</span>Delete</button>' +
      '<button class="btn btn-status" data-book-index="' +
      bookIndex +
      '" type="button"> <span>icon</span>Status</button>';
  }

  addDeleteButtonsEventListener();
  addStatusButtonsEventListener();
}

function createBooksTable() {
  let container = document.getElementById("tableContainer");
  container.innerHTML =
    '<table id="booksTable"><tr><th>Title</th><th>Author</th><th>Year</th><th>Number of pages</th><th>Read</th><th>Actions</th></tr></table>';
}

function addStatusButtonsEventListener() {
  const statusButtons = Array.from(document.getElementsByClassName("btn-status"));

  statusButtons.forEach((button) => {
    const bookIndex = button.getAttribute("data-book-index");

    button.addEventListener("click", () => {
      changeBookStatus(bookIndex);
    });
  });
}

function changeBookStatus(bookIndex) {
  const currentBookStatus = myLibrary[bookIndex].read;

  myLibrary[bookIndex].read = !currentBookStatus;

  displayBooks();
}

function addDeleteButtonsEventListener() {
  const deleteButtons = Array.from(document.getElementsByClassName("btn-delete"));

  deleteButtons.forEach((button) => {
    const bookIndex = button.getAttribute("data-book-index");

    button.addEventListener("click", () => {
      deleteBookFromLibrary(bookIndex);
    });
  });
}

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

//todo layout
