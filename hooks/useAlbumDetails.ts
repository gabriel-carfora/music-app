import { useState, useEffect, useCallback } from 'react';
import { getAlbumDetails } from '../services/spotify/spotifyBase';
import { SpotifyAlbum } from '../types/spotify/spotifyMusic';

export const useAlbumDetails = (spotifyAlbumId: string | undefined) => {
  const [albumData, setAlbumData] = useState<SpotifyAlbum | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbum = useCallback(async () => {
    if (!spotifyAlbumId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getAlbumDetails(spotifyAlbumId);
      setAlbumData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching album:', err);
      setError('Failed to load album details');
      setAlbumData(null);
    } finally {
      setLoading(false);
    }
  }, [spotifyAlbumId]);

  useEffect(() => {
    fetchAlbum();
  }, [fetchAlbum]);

  return { 
    albumData, 
    loading, 
    error,
    refreshData: fetchAlbum 
  };
};