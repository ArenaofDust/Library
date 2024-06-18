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

function Book(title, author, numPages, year, bookIsRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.year = year;
    this.bookIsRead = bookIsRead;

    this.info = function() {
        console.log(`${this.name} by ${this.author}, ${this.numPages} pages, ${this.bookIsRead} yet`);
    }
}

function addBookToLibrary(book) {
    return myLibrary(book);
}

const booksContainer = document.querySelector(".books-container");

function displayBooks() {
    booksContainer.textContent = "";
    let position = 0;

    for(book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        booksContainer.appendChild(bookCard);

        const titleElement = document.createElement("h4");
        titleElement.textContent = book.title;
        bookCard.appendChild(titleElement);

        const authorElement = document.createElement("p");
        authorElement.innerHTML = `<b>Author</b>: ${book.author}`;
        bookCard.appendChild(authorElement);

        const pagesElement = document.createElement("p");
        pagesElement.innerHTML = `<b>Num of Pages</b>: ${book.pages}`;
        bookCard.appendChild(pagesElement);

        const yearElement = document.createElement("p");
        yearElement.innerHTML = `<b>Year Published</b>: ${book.year}`;
        bookCard.appendChild(yearElement);

        const hasReadElement = document.createElement("p");
        hasReadElement.style.fontWeight = "bold";

        if(book.bookIsRead) {
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
    const readElements = document.getElementsByName("hasReadBook");

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
    modal.closest();
    clearDialog();
});


