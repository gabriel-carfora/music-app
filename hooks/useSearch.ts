import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { searchAlbum } from 'services/spotify/spotifyBase';
import { SpotifyAlbum } from 'types/spotify/spotifyMusic';

interface SearchState {
  albums: SpotifyAlbum[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  initialSearch: boolean;
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState<SearchState>({
    albums: [],
    loading: false,
    refreshing: false,
    error: null,
    initialSearch: false,
  });
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim() || state.loading) return;

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const results = await searchAlbum('', searchQuery);
      const newAlbums = results?.albums?.items || [];
      setState(prev => ({
        ...prev,
        albums: newAlbums,
        loading: false,
        refreshing: false,
        initialSearch: true,
      }));
    } catch (error) {
      console.error('Search error:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to search albums. Please try again.',
        loading: false,
        refreshing: false,
        initialSearch: true,
      }));
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setState(prev => ({
          ...prev,
          albums: [],
          error: null,
          initialSearch: false,
        }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleRefresh = useCallback(() => {
    setState(prev => ({ ...prev, refreshing: true }));
    handleSearch();
  }, [searchQuery]);

  const handleAlbumPress = useCallback(
    (album: SpotifyAlbum) => {
      router.push({
        pathname: '/album',
        params: { id: album.id },
      });
    },
    [router]
  );

  return {
    searchQuery,
    setSearchQuery,
    albums: state.albums,
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    initialSearch: state.initialSearch,
    handleRefresh,
    handleAlbumPress
  };
};