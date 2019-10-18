import {
  observable,
  flow,
  decorate,
  action,
  computed,
  runInAction
} from 'mobx';
import { getPriceWithType } from './utils/utils';

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
class BookApi {
  constructor() {
    this.state = 'loading';

    this.fetchBooks = flow(function*() {
      this.state = 'pending';
      try {
        const response = yield fetch('http://henri-potier.xebia.fr/books');
        const json = yield response.json();
        this.state = 'done';
        return json;
      } catch (error) {
        this.state = 'error';
      }
    });

    this.fetchOffers = flow(function*() {
      this.state = 'pending';
      const allId = this.basket.map(book => {
        return book.id;
      });
      const str = allId.toString();
      const url =
        'http://henri-potier.xebia.fr/books/' + str + '/commercialOffers';
      try {
        const response = yield fetch(url);
        const json = yield response.json();
        this.state = 'done';
        this.offers = json.offers;
      } catch (error) {
        this.state = 'error';
      }
    });
  }
}
class BookStore {
  constructor(api) {
    this.books = [];
    this.basket = [];
    this.offers = [];
    this.totalOrder = 0;
    this.filter = '';
    this.bookApi = api;
    this.addBook = this.addBook.bind(this);
    this.modifyFilter = this.modifyFilter.bind(this);

    this.getBooks = async () => {
      const books = await api.fetchBooks();

      runInAction(() => {
        this.books = books;
      });
    };
  }

  get filteredBook() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.books.filter(
      book => !this.filter || matchesFilter.test(book.title)
    );
  }
  get bestOffer() {
    let offers = this.offers.map(offer =>
      getPriceWithType(this.totalOrder, offer)
    );
    return Math.floor(Math.max(...offers));
  }
  modifyFilter(val) {
    this.filter = val;
  }
  addBook(id) {
    const selected = this.books.find(book => book.isbn === id);
    this.basket.push(new Book(selected));
    this.totalOrder += selected.price;
  }
  emptyCart() {
    this.basket.clear();
    this.totalOrder = 0;
  }
}
decorate(BookStore, {
  books: observable,
  state: observable,
  basket: observable,
  offers: observable,
  totalOrder: observable,
  filter: observable,
  filteredBook: computed,
  bestOffer: computed,
  getBooks: action,
  modifyFilter: action,
  addBook: action,
  emptyCart: action
});

const api = new BookApi();
export default new BookStore(api);
