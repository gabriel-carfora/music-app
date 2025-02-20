import { useState, useCallback, useContext, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from 'contexts/AuthContext';
import { Review } from '../types/review';

interface UserProfile {
  username: string;
  profilePic: string;
}

interface UserDataState {
  userProfile: UserProfile | null;
  reviews: Review[];
  loading: boolean;
  error: string | null;
  authChecking: boolean;
}

export function useProfile() {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState<UserDataState>({
    userProfile: null,
    reviews: [],
    loading: true,
    error: null,
    authChecking: true, 
  });

  const fetchUserData = useCallback(async () => {
    if (state.authChecking) return;
    if (!user) {
      setState(prev => ({ 
        ...prev, 
        error: 'No user is logged in.', 
        loading: false 
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const userProfile = userDoc.exists() 
        ? {
            username: userDoc.data().username || 'Anonymous',
            profilePic: userDoc.data().profilePic || '',
          }
        : null;

      const reviewsRef = collection(db, 'reviews');
      const q = query(
        reviewsRef, 
        where('userId', '==', user.uid), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const reviews: Review[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        reviews.push({
          id: doc.id,
          username: userProfile?.username || 'Anonymous',
          userId: data.userId,
          spotifyAlbumId: data.spotifyAlbumId,
          rating: data.rating,
          text: data.text,
          createdAt: data.createdAt,
        });
      });

      setState({
        userProfile,
        reviews,
        loading: false,
        error: null,
        authChecking: false,
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load user data.', 
        loading: false 
      }));
    }
  }, [user, state.authChecking]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        authChecking: false 
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!state.authChecking) {
      fetchUserData();
    }
  }, [fetchUserData, state.authChecking]);

  return { ...state, fetchUserData };
}