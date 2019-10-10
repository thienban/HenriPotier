import { observable, flow, decorate, action, computed } from 'mobx';

const tranche = (price, slice) => {
  let reste = Math.floor(price / slice);
  return reste;
};

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
    this.offers = [];
    this.totalOrder = 0;
    this.filter = '';

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

    this.fetchOffers = flow(function*() {
      this.offers = [];
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

    this.addBook = this.addBook.bind(this);
    this.modifyFilter = this.modifyFilter.bind(this);
  }
  get filteredBook() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.books.filter(
      book => !this.filter || matchesFilter.test(book.title)
    );
  }
  get bestOffer() {
    let percentage, minus, slice;
    this.offers.forEach(offer => {
      if (offer.type && offer.type === 'percentage') {
        percentage = this.totalOrder * 0.01 * offer.value;
      }
      if (offer.type && offer.type === 'minus') {
        minus = offer.value;
      }
      if (offer.type && offer.type === 'slice') {
        let num = tranche(this.totalOrder, offer.sliceValue);
        slice = num * offer.value;
      }
    });
    let max;
    if (percentage && minus && minus) {
      max = Math.max(percentage, minus, slice);
    } else if (percentage && minus) {
      max = Math.max(percentage, minus);
    } else {
      max = percentage;
    }
    return Math.floor(max);
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
  modifyFilter: action,
  addBook: action,
  emptyCart: action
});

export default new BookStore();
