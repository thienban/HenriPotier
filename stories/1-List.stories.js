import React from 'react';
import { storiesOf } from '@storybook/react';

import ListBook from '../src/components/books';
import withCondition from '../src/components/Hoc/withCondition';
import posts from '../src/components/listToTest';

const BookWithConditional = withCondition(ListBook);

storiesOf('List', module)
  .add('Emty', () => <BookWithConditional books={[]} />)
  .add('Loading', () => <BookWithConditional state={'loading'} />)
  .add('Filled', () => <BookWithConditional books={posts} />);
