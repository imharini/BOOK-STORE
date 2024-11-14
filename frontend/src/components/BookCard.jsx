import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book._id}`}>
        <img src={book.itemImage} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.genre}</p>
      </Link>
    </div>
  );
};

export default BookCard;
