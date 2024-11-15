import React from 'react';

function BookCard({ title, author, price }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>{author}</p>
      <p>${price.toFixed(2)}</p>
    </div>
  );
}

export default BookCard;

