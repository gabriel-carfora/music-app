export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  track_number: number;
  preview_url?: string | null;
}

export interface Artist {
  id: string;
  name: string;
}

export interface AlbumImage {
  url: string;
  height: number;
  width: number;
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: AlbumImage[];
  release_date: string;
  total_tracks: number;
  tracks: Track[];
}

export interface AlbumDetailsProps {
  albumId: string;
  onReviewSubmitted?: () => void;
}

export interface AlbumItemProps {
  item: Album;
  onPress: (album: Album) => void;
}