import React, { useState } from 'react';
import api from '../utils/api';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', { title, author, price });
      alert('Book added successfully');
    } catch (error) {
      console.error('Failed to add book', error);
    }
  };

  return (
    <form onSubmit={handleAddBook}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
