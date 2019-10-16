import React, { useEffect } from 'react';
import ListBook from './books';
import withEither from './Hoc/withCondition';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Loading from '../components/loading';
import Message from '../components/message';

const BookContainer = ({ store }) => {
  useEffect(() => {
    store.fetchBooks();
  }, []);
  const isLoadingConditionFn = props => props.state === 'loading';
  const nullConditionFn = props => !props.books;
  const isEmptyConditionFn = props => !props.books.length;

  const withConditionalRender = compose(
    withEither(isLoadingConditionFn, Loading),
    withEither(isEmptyConditionFn, Message),
    withEither(nullConditionFn, null)
  );

  const BookWithConditional = withConditionalRender(ListBook);

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
