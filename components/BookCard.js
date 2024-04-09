import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBook } from '../api/bookData';

function BookCard({ bookObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisBook = () => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <p className="card-text bold">{bookObj.sale && <span> 📢SALE<br /></span> } ${bookObj.price}</p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/book/${bookObj.firebaseKey}`} passHref>
          <Button style={{ backgroundColor: '#f4a261', border: 'none' }} className="m-2">🔍</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/book/edit/${bookObj.firebaseKey}`} passHref>
          <Button style={{ backgroundColor: '#90a955', border: 'none' }}>✏️</Button>
        </Link>
        <Button style={{ backgroundColor: '#ef5d60', border: 'none' }} onClick={deleteThisBook} className="m-2">
          🗑️
        </Button>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
