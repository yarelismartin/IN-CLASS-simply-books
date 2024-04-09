import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteAuthorAndAuthorBooks } from '../api/mergedData';
import { updateAuthor } from '../api/authorData';

function AuthorCard({ authorObj, onUpdate }) {
  /* In components we are just returning the jsx of that component with its given props */
  const router = useRouter();

  const toggleFavorite = () => {
    if (authorObj.favorite) {
      updateAuthor({ ...authorObj, favorite: false }).then(onUpdate);
    } else {
      updateAuthor({ ...authorObj, favorite: true }).then(onUpdate);
    }
  };

  const deleteAuthorAndBooks = () => {
    if (window.confirm(`Deleting ${authorObj.first_name} ${authorObj.last_name} will also delete all books by ${authorObj.last_name}.`)) {
      deleteAuthorAndAuthorBooks(authorObj.firebaseKey).then(onUpdate);
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{authorObj.first_name} {authorObj.last_name}</Card.Title>
        <Card.Text> {authorObj.email} </Card.Text>
        <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
          {router.pathname === '/authors' && (
          <Link href={`/author/${authorObj.firebaseKey}`} passHref>
            <Button variant="primary">VIEW</Button>
          </Link>
          )}
          <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
            <Button variant="success">EDIT</Button>
          </Link>
          <Button onClick={toggleFavorite} className="my-btn"><span>{authorObj.favorite ? '❤️' : '🤍'}</span></Button>
          <Button variant="danger" onClick={deleteAuthorAndBooks}>DELETE</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
