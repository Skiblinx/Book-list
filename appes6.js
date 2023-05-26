//Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

//UI class
class UI {
    //add book prototype
    addBook = (book) => {
        const list = document.getElementById("book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="delete" href="#">X</a></td>
        `
        list.appendChild(row);
    }

    //clear fields on adding book
    clearField = () => {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }

    showAlert = (message, className) => {
        //create div
        const div = document.createElement('div');

        //add classes to created div
        div.className = `alert ${className}`

        //create text node and append to div
        div.appendChild(document.createTextNode(message))

        //select container
        const container = document.querySelector('.container')

        //select form
        const form = document.querySelector('#book-form')

        //insert div in between container and form
        container.insertBefore(div, form)

        //set time out for alert
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2500)
    }

    deleteBook = (target) => {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}


//Event Listner

document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn)

    const ui = new UI(book)

    if (title !== '' || author !== '') {
        ui.addBook(book)

        ui.showAlert('Book added Successfully', 'success')

        ui.clearField()
    } else {
        ui.showAlert('Complete the fields', 'error')
    }


    e.preventDefault();
})

document.querySelector('#book-list').addEventListener("click", (e) => {

    const ui = new UI()

    ui.deleteBook(e.target)

    ui.showAlert('Book removed', 'success')
    e.preventDefault();
})