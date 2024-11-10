let myLibrary = [
  {
    title: "The Mark of Athena",
    author: "Rick Riordan",
    year: 2012,
    numberOfPages: 175,
    read: true,
  },
  {
    title: "The Secret History",
    author: "Donna Tartt",
    year: 1992,
    numberOfPages: 250,
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

function createBooksTable() {
  let container = document.getElementById("tableContainer");
  container.innerHTML =
    '<table id="booksTable"><tr><th>Title</th><th>Author</th><th>Year</th><th>Number of pages</th><th>Read</th><th>Actions</th></tr></table>';
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
      '" type="button"> <span>icon</span>Delete</button>';
  }

  addDeleteButtonsEventListener();
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

displayBooks();

// function addBookToLibrary(title, author, year, numberOfPages, read) {
//   const newBook = new Book(title, author, year, numberOfPages, read);
//   myLibrary.push(newBook);
// }

//todo new book form in dialog/modal
//todo change status button
//todo layout
