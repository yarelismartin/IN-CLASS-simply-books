import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

function AuthorCard({ authorObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{authorObj.first_name} {authorObj.last_name}</Card.Title>
        <Card.Text> {authorObj.email} </Card.Text>
        <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
          <Link href={`/author/${authorObj.firebaseKey}`} passHref>
            <Button variant="primary">VIEW</Button>
          </Link>
          <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
            <Button variant="success">EDIT</Button>
          </Link>
          <Button variant="info">HEART</Button>
          <Button variant="danger">DELETE</Button>
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
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default AuthorCard;
