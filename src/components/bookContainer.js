import React, { useEffect } from 'react';
import ListBook from './books';
import withConditional from './Hoc/withCondition';
import { inject, observer } from 'mobx-react';

const BookContainer = ({ store }) => {
  useEffect(() => {
    store.fetchBooks();
  }, []);

  const BookWithConditional = withConditional(ListBook);

  return (
    <div>
      <BookWithConditional
        state={store.state}
        books={store.filteredBook}
        handleBuy={store.addBook}
        inputFilter={store.filter}
        handleFilter={store.modifyFilter}
      />
    </div>
  );
};

export default inject('store')(observer(BookContainer));
