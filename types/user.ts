import { Album, Track } from "./music";
import { Review } from "./review";

export interface User {
  id: string;
  username: string;
  bio: string;
  favourite_albums: Album[];
  reviews: Review[];
  favourite_songs: Track[];
  
}


