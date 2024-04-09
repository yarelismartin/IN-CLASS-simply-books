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

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetail);
  }, [firebaseKey]);

  return (
    <div>
      <AuthorCard key={authorDetail.firebaseKey} authorObj={authorDetail} />
      <div className="d-flex flex-wrap">
        {authorDetail.books?.map((bookObj) => (
          <BookCard key={bookObj.firebaseKey} bookObj={bookObj} />
        ))}
      </div>
    </div>
  );
}
