import { observable, flow, decorate } from 'mobx';

class BookStore {
  constructor() {
    this.books = [];
    this.state = 'loading';

    this.fetchBooks = flow(function*() {
      this.books = [];
      this.state = 'pending';
      try {
        const response = yield fetch('http://henri-potier.xebia.fr/books');
        const json = yield response.json();
        console.log(json);
        this.state = 'done';
        this.books = json;
      } catch (error) {
        this.state = 'error';
      }
    });
  }
}
decorate(BookStore, {
  books: observable,
  state: observable
});

export default new BookStore();
