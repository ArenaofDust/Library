const myLibrary = [
    {
        title: "The Stranger",
        author: "Albert Camus",
        pages: 250,
        year: 1942,
        hasRead: true,

    },
    {
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        pages: 850,
        year: 1880,
        hasRead: false,

    },
    {
        title: "Catch 22",
        author: "Joseph Heller",
        pages: 400,
        year: 1961,
        hasRead: false,

    }
];

function Book(title, author, numPages, year, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.year = year;
    this.read = hasRead;

    this.info = function() {
        console.log(`${this.name} by ${this.author}, ${this.numPages} pages, ${this.read} yet`);
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

        if(book.hasRead) {
            hasReadElement.textContent = "Read"
            hasReadElement.style.color = "#4ade80";
        }
        else {
            hasReadElement.textContent = "Not Read"
            hasReadElement.style.color = "#dc2626";
        }
    }
}