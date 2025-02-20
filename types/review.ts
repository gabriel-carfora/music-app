import { Timestamp } from 'firebase/firestore';

export interface Review {
  id: string;
  username: string;
  userId: string;
  spotifyAlbumId: string;
  rating: number;
  text?: string;
  createdAt: Timestamp;
}

export interface ReviewSubmission {
  userId: string;
  albumId: string;
  rating: number;
  text?: string;
}

export interface MiniReviewProps {
  rating: number;
  text: string;
  spotifyAlbumId: string;
  userId: string;
  createdAt: Timestamp;  // Changed from string to Timestamp
  albumName: string;
}


export interface ReviewListProps {
  albumId: string;
  onReviewSubmitted?: () => void;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  userRating?: number;
}

export interface RatingEmoji {
  terrible: '🤮', // 0-2
  bad: '🤢',      // 2.1-4
  neutral: '😐',  // 4.1-6
  good: '😊',     // 6.1-8
  amazing: '🤩'   // 8.1-10
}