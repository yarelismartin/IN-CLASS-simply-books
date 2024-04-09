/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function User({ userObj }) {
  const timePortion = userObj.metadata.lastSignInTime.split(' ').slice(1, 4).join(' ');

  return (
    <>
      <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px' }}>
        <img src={userObj.photoURL} alt="user img" />
        <Card.Body>
          <Card.Title>{userObj.displayName}</Card.Title>
          <Card.Text>
            {userObj.email}
          </Card.Text>
          <Card.Text>
            Last Sign In: {timePortion}
          </Card.Text>
        </Card.Body>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button style={{ width: '18rem' }} type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

User.propTypes = {
  userObj: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }).isRequired,
  }).isRequired,

};
