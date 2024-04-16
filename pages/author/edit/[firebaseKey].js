import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthorForm from '../../../components/forms/AuthorForm';
import { getSingleAuthor } from '../../../api/authorData';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState({});

  /* we use this in order to grab data from the dynamic routes */
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <AuthorForm obj={editItem} />
  );
}
