import React from 'react';
import { storiesOf } from '@storybook/react';

import ListBook from '../src/components/books';
import posts from '../src/components/listToTest';

storiesOf('List', module)
  .add('Emty', () => <ListBook books={[]} />)
  .add('Filled', () => <ListBook books={posts} />);
