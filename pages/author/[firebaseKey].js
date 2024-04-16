import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
/* import { Card, Button } from 'react-bootstrap';
import Link from 'next/link'; */
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';
import AuthorCard from '../../components/AuthorCard';
// inside component use

export default function ViewAuthor() {
  const [authorDetail, setAuthorDetail] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAuthorDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetail);
  };
  /* we want a useState when we are making api calls because when we
  call an api then we need to set it so make a usestate for
  every api call */

  useEffect(() => {
    getAuthorDetails();
    console.warn(firebaseKey);
    return () => {
      setAuthorDetail([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <div>
      <AuthorCard key={authorDetail.firebaseKey} authorObj={authorDetail} onUpdate={() => router.push('/authors')} />
      <div className="d-flex flex-wrap">
        {authorDetail.books?.map((bookObj) => (
          <BookCard key={bookObj.firebaseKey} bookObj={bookObj} onUpdate={getAuthorDetails} />
        ))}
      </div>
    </div>
  );
}

/* When it comes to onUpdate it's reffering to the prop in the inetial component
it's prop type is a function so it's expecting a function.

for authorcard onupdate is updating when user del a card and fav/unfav a card.
we are passing author card the route to the authors page becaise when an author is deleted we should take the user back to the author page.
it is also occuring when a user fav/unfav which isn't ideal.

for the bookcard onupdate runs when the user is del a card.
we are getting the author details because when we del a book we want the author details page to still show
 */
