import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useUser = (userId: string) => {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      console.log('fetchUser function called');
      try {
        console.log('Attempting to fetch user doc'); 
        const userDoc = await getDoc(doc(db, 'users', userId));
        console.log('User doc exists:', userDoc.exists());
        console.log('User data:', userDoc.data());
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      console.log('userId exists, calling fetchUser');
      fetchUser();
    } else {
      console.log('No userId provided');
    }
  }, [userId]);

  return { username, loading, error };
};