import React, { useEffect } from 'react';
import ListBook from './books';
import { inject, observer } from 'mobx-react';

const BookContainer = ({ store }) => {
  useEffect(() => {
    store.fetchBooks();
  }, []);

  return (
    <div>
      <ListBook books={store.books} handleBuy={store.addBook} />
    </div>
  );
};

export default inject('store')(observer(BookContainer));
