import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAuthors } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';

export default function Author() {
  const [authors, setAuthor] = useState([]);

  const { user } = useAuth();

  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthor);
  };

  useEffect(() => {
    getAllAuthors();
  });

  return (
    <div className="text-center my-4">
      <Link passHref href="/author/new">
        <Button>Create Author</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-between">
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} />
        ))}
      </div>

    </div>
  );
}
