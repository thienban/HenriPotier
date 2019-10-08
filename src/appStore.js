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

class Order {
  constructor(price, quantity) {
    this.price = price,
    this.quantity = quantity
  }

  get total() {
    return this.price * this.quantity
  }
}
decorate(Order,{
  price: observable,
  quantity: observable
})

class BookStore {
  constructor() {
    this.books = [];
    this.state = 'loading';
    this.basket = [];
    this.offers = [];
    this.totalOrder = 0;

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
  }

  // get totalBasket() {
  //   return this.basket.reduce((pre, current) => {
  //     pre+current.price
  //   }, 0)
  // }
  // get totalOffer() {
  //   return this.offers[1].value;
  // }
  addBook(id) {
    const selected = this.books.find(book => book.isbn === id);
    this.basket.push(new Book(selected));
    this.totalOrder += selected.price;
  }
}
decorate(BookStore, {
  books: observable,
  state: observable,
  basket: observable,
  offers: observable,
  totalOrder: observable,
  addBook: action
});

export default new BookStore();
