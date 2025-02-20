import { Review } from "./review";

export interface UserProfile {
    username: string;
    profilePic: string;
  }
  
  export interface UserProfileState {
    userProfile: UserProfile | null;
    reviews: Review[];
    loading: boolean;
    error: string | null;
  }
  