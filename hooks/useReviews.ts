import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Review } from '../types/review';

export const useReviews = (albumId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      
      try {
        const reviewsRef = collection(db, 'reviews');
        const q = query(
          reviewsRef,
          where('spotifyAlbumId', '==', albumId),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedReviews: Review[] = [];
        querySnapshot.forEach(doc => {
          console.log('Fetched reviews:', fetchedReviews);
          const data = doc.data();
          fetchedReviews.push({
            id: doc.id,
            userId: data.userId,
            spotifyAlbumId: data.spotifyAlbumId,
            rating: data.rating,
            createdAt: data.createdAt,
            text: data.text || '',
            username: ''
          });
        });
        setReviews(fetchedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [albumId]);

  return { reviews, loading, error };
};