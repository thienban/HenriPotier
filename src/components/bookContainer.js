import React, { useState, useEffect } from 'react';
import ListBook from './books';
import posts from './listToTest';

const BookContainer = () => {
  //   const [book, setBook] = useState([]);
  //   useEffect(() => {
  //     // Fetch
  //   });

  return (
    <div>
      <ListBook books={posts} />
    </div>
  );
};

export default BookContainer;
