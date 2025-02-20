import axios from 'axios';
import { SpotifyAPITimeRange, SpotifyTimeRange, SpotifyUserProfile, SpotifyUserTopItems } from 'types/spotify/spotifyUser';

export const getUserProfile = async (accessToken: string): Promise<SpotifyUserProfile> => {
  console.log('Fetching Spotify profile with token:', accessToken.substring(0, 10) + '...');

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Spotify API error:', await response.text());
    throw new Error('Failed to fetch Spotify profile');
  }

  const data = await response.json();
  console.log('Spotify profile data:', data);

  return {
    id: data.id,
    display_name: data.display_name,
    email: data.email,
    images: data.images || [],
  };
};

export async function getUserTopTracks(
  userToken: string,
  timeRange: SpotifyTimeRange
): Promise<SpotifyUserTopItems> {
  const apiTimeRange: SpotifyAPITimeRange = convertTimeRange(timeRange);

  try {
    const response = await axios.get<SpotifyUserTopItems>('https://api.spotify.com/v1/me/top/tracks', {
      params: {
        limit: 20,
        time_range: apiTimeRange,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error;
  }
}

function convertTimeRange(timeRange: SpotifyTimeRange): SpotifyAPITimeRange {
  switch (timeRange) {
    case 'month':
      return 'short_term';
    case 'sixmonths':
      return 'medium_term';
    case 'year':
      return 'long_term';
  }
}

export async function getUserTopArtists(
  userToken: string,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
): Promise<SpotifyUserTopItems> {
  try {
    const response = await axios.get<SpotifyUserTopItems>('https://api.spotify.com/v1/me/top/artists', {
      params: {
        limit: 20,
        time_range: timeRange,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
}

export async function getUserSavedAlbums(
  userToken: string,
  limit: number = 20,
  offset: number = 0
): Promise<SpotifyUserTopItems> {
  try {
    const response = await axios.get<SpotifyUserTopItems>('https://api.spotify.com/v1/me/albums', {
      params: {
        limit,
        offset,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching saved albums:', error);
    throw error;
  }
}