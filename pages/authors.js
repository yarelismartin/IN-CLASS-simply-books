import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAuthors } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';

export default function Author() {
  /* state that holds the list of authors */
  const [authors, setAuthor] = useState([]);

  /* accessing user info with useAuth */
  const { user } = useAuth();

  /* function that will fetch all authors based on uid
  setAuthor is used because it's how we update authors */
  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthor);
  };

  /* hook to fetch authors when it component mounts or user changes */
  useEffect(() => {
    getAllAuthors();
  });

  return (
    /* this button takes us to the create form */
    <div className="text-center my-4">
      <Link passHref href="/author/new">
        <Button>Create Author</Button>
      </Link>

      {/* this div will wrap all the cards that are rendered from our data */}
      <div className="d-flex flex-wrap justify-content-between">

        {/* we use out authors state variable and map through our authors, using the AuthorCard compnent to render that jsx ensuring we provide the props w/in the component */}
        {/* In React, the key prop is a special attribute that you
        can include when rendering a list of elements. It's used to help React identify which items have changed, are added, or are removed in a list. */}
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
        ))}
      </div>

    </div>
  );
}
