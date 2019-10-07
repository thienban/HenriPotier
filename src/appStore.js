import { observable, flow, decorate, action } from 'mobx';
class Book {
  constructor(obj) {
    this.id = obj.isbn;
    this.title = obj.title;
    this.price = obj.price;
    this.cover = obj.cover;
    this.synosis = obj.synosis;
  }
}

decorate(Book, {
  id: observable,
  title: observable,
  price: observable,
  cover: observable,
  synosis: observable
});

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
    const selected = this.books.find(book => book.isbn === id);
    this.basket.push(new Book(selected));
  }
}
decorate(BookStore, {
  books: observable,
  state: observable,
  basket: observable,
  addBook: action
});

export default new BookStore();
