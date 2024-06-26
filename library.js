const myLibrary = [
    {
        title: "The Stranger",
        author: "Albert Camus",
        pages: 250,
        year: 1942,
        bookIsRead: true,

    },
    {
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        pages: 850,
        year: 1880,
        bookIsRead: false,

    },
    {
        title: "Catch 22",
        author: "Joseph Heller",
        pages: 400,
        year: 1961,
        bookIsRead: false,
    }
];

function Book(title, author, pages, year, bookIsRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.bookIsRead = bookIsRead;
}

function addBookToLibrary(newBook) {
    return myLibrary.push(newBook);
}

const booksContainer = document.querySelector(".books-container");

function displayBooks() {
    booksContainer.textContent = "";
    let position = 0;

    for(newBook of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        booksContainer.appendChild(bookCard);

        const titleElement = document.createElement("h4");
        titleElement.textContent = newBook.title;
        bookCard.appendChild(titleElement);

        const authorElement = document.createElement("p");
        authorElement.innerHTML = `<b>Author</b>: ${newBook.author}`;
        bookCard.appendChild(authorElement);

        const pagesElement = document.createElement("p");
        pagesElement.innerHTML = `<b>Num of Pages</b>: ${newBook.pages}`;
        bookCard.appendChild(pagesElement);

        const yearElement = document.createElement("p");
        yearElement.innerHTML = `<b>Year Published</b>: ${newBook.year}`;
        bookCard.appendChild(yearElement);

        const hasReadElement = document.createElement("p");
        hasReadElement.style.fontWeight = "bold";

        if(newBook.bookIsRead) {
            hasReadElement.textContent = "Read"
            hasReadElement.style.color = "#4ade80";
        }
        else {
            hasReadElement.textContent = "Not Read"
            hasReadElement.style.color = "#dc2626";
        }
        bookCard.appendChild(hasReadElement);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("dataPosition", position);
        deleteButton.classList.add("delete-button");
        bookCard.appendChild(deleteButton);

        const hasReadButton = document.createElement("button");
        hasReadButton.textContent = "Finished Reading?";
        hasReadButton.setAttribute("dataPosition", position);
        hasReadButton.classList.add("hasRead-button");
        bookCard.appendChild(hasReadButton);

        position++;
    }
}

displayBooks();

const newBookButton = document.querySelector(".new-book");
const modal = document.querySelector(".modal")

newBookButton.addEventListener("click", () => {
    modal.showModal();
});

const addBookButton = document.querySelector(".add-book");

addBookButton.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const year = document.getElementById("year").value;
    const readElements = document.getElementsByName("bookIsRead");

    let bookIsRead = false;

    if(pages <= 0) {
        alert("No negative pages allowed");
        return;
    }

    if(year < 0) {
        alert("No negative years allowed");
        return;
    }

    for (let i = 0; i < readElements.length; i++) {
        if(readElements[i].checked) {
            bookIsRead = readElements[i].value === "true";
            break;
        }
    }

    const newBook = new Book(title, author, pages, year, bookIsRead);
    
    addBookToLibrary(newBook);

    displayBooks();
});

const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", () => {
    modal.close();
    clearDialog();
});

booksContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete-button")) {
        const pos = e.target.getAttribute("dataPosition");
        if(confirm("Are you sure?")) {
            myLibrary.splice(pos, 1);
        }
        else {
            return;
        }
    }

    if(e.target.classList.contains("hasRead-button")) {
        const pos = e.target.getAttribute("dataPosition");

        myLibrary[pos].bookIsRead ? (myLibrary[pos].bookIsRead = false) : (myLibrary[pos].bookIsRead = true);

    }

    displayBooks();
});

function dialogClickHandler(e) {
    if (e.target.tagName !== "DIALOG") return;
  
    const rect = e.target.getBoundingClientRect();
  
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
  
    if (clickedInDialog === false) e.target.close();
  
    clearDialog();
}

document.addEventListener("click", dialogClickHandler);

function clearDialog() {
    const title = document.getElementById("title").value = "";
    const author = document.getElementById("author").value = "";
    const pages = document.getElementById("pages").value = "";
    const year = document.getElementById("year").value = "";
    ["no", "yes"].forEach((id) => {
      document.getElementById(id).checked = false;
    });
}


