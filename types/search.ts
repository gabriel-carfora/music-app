import { SpotifyAlbum } from './spotify/spotifyMusic';
  
export interface AlbumItemProps {
    item: SpotifyAlbum;
    onPress: (album: SpotifyAlbum) => void;
  }