import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({ title: '', author: '', price: '' });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Failed to fetch book details', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleEditBook = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, book);
      alert('Book updated successfully');
    } catch (error) {
      console.error('Failed to update book', error);
    }
  };

  return (
    <form onSubmit={handleEditBook}>
      <input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
      <input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
      <input type="number" placeholder="Price" value={book.price} onChange={(e) => setBook({ ...book, price: e.target.value })} />
      <button type="submit">Update Book</button>
    </form>
  );
}

export default EditBook;
