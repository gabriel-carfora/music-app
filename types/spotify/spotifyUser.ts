import { SpotifyTrack } from "./spotifyMusic";

export type SpotifyTimeRange = 'month' | 'sixmonths' | 'year';
export type SpotifyAPITimeRange = 'short_term' | 'medium_term' | 'long_term';
export interface SpotifyTopTracksProps {
  timeRange: SpotifyTimeRange;
}

export interface SpotifyTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface SpotifyUserProfile {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
}

export interface SpotifyAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface SpotifyUserTopItems {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}