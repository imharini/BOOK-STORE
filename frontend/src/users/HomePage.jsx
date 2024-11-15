import React from 'react';
import BookCard from '../components/BookCard';

function HomePage() {
  return (
    <div>
      <h1>Book Store</h1>
      <div className="book-list">
        {/* Fetch and map books here */}
        <BookCard title="Sample Book" author="Author Name" price={19.99} />
      </div>
    </div>
  );
}

export default HomePage;


