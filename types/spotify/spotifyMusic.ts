import type { Album, Artist, Track } from '../music';

export interface SpotifyArtist extends Artist {
  external_urls: {
    spotify: string;
  };
}
export interface SpotifyTrack {
  id: string;
  album: SpotifyAlbum;
  name: string;
  artists: SpotifyArtist[];
  duration_ms: number;
  track_number: number;
  preview_url?: string | null;
  popularity?: number;
}


export interface SpotifyTracks {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
  previous: string | null;
  next: string | null;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: SpotifyAlbumImage[];
  release_date: string;
  total_tracks: number;
  tracks: SpotifyTracks;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}


export interface SpotifyAlbumImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifySearchResponse {
  albums: {
    items: SpotifyAlbum[];
    total: number;
    limit: number;
    offset: number;
    previous: string | null;
    next: string | null;
  };
}