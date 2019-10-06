import { observable, flow, decorate, action } from 'mobx';

class BookStore {
  constructor() {
    this.books = [];
    this.state = 'loading';
    this.basket = [];

    this.fetchBooks = flow(function*() {
      this.books = [];
      this.state = 'pending';
      try {
        const response = yield fetch('http://henri-potier.xebia.fr/books');
        const json = yield response.json();
        this.state = 'done';
        this.books = json;
      } catch (error) {
        this.state = 'error';
      }
    });

    this.addBook = this.addBook.bind(this);
  }
  addBook(id) {
    const selected = this.books.map(book => {
      if (book.isbn === id) {
        return book;
      }
    });
    this.basket.push(selected);
  }
}
decorate(BookStore, {
  books: observable,
  state: observable,
  basket: observable,
  addBook: action
});

export default new BookStore();
