import axios from 'axios';
import { SpotifyAlbum, SpotifyTrack } from '../../types/spotify/spotifyMusic';
import { SpotifyTokenResponse, SpotifySearchResponse } from '../../types/spotify/spotify';


function btoa(str: string): string {
  return global.btoa(str);
}

const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.get<SpotifyTokenResponse>('https://devproxy.carfora.xyz/api/spotify-token');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export async function searchAlbum(artist: string, query: string): Promise<SpotifySearchResponse> {
  try {
    const token = await getAccessToken();
    const searchQuery = artist ? `artist:${artist} ${query}` : query;

    const response = await axios.get<SpotifySearchResponse>('https://devproxy.carfora.xyz/api/spotify/search', {
      params: {
        q: searchQuery,
        type: 'album',
        limit: 20,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching albums:', error);
    throw error;
  }
}

export async function getAlbumDetails(albumId: string): Promise<SpotifyAlbum> {
  try {
    const token = await getAccessToken();
    const response = await axios.get<SpotifyAlbum>(
      `https://devproxy.carfora.xyz/api/spotify/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting album details:', error);
    throw error;
  }
}

export async function getAlbumMetadata(albumId: string) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://devproxy.carfora.xyz/api/spotify/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('Error response:', await response.text());
      throw new Error(`Failed to fetch album metadata: ${response.status}`);
    }
 
    const data = await response.json();
    console.log('Received data:', data);
    
    return {
      releaseDate: data.release_date,
      format: 'LP', 
      label: data.label,
      genres: data.genres,
      producers: data.producers || [], 
      writers: data.writers || [], 
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
 }

 export async function getAlbumTracks(albumId: string): Promise<SpotifyTrack[]> {
  console.log('getAlbumTracks called with:', albumId);
  try {
    const token = await getAccessToken();
    console.log('Got token:', token?.substring(0, 10) + '...');
    const response = await axios.get<SpotifyTrack[]>(
      `https://devproxy.carfora.xyz/api/spotify/albums/${albumId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        }
      }
    );
    
    console.log('Received track data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Full getAlbumTracks error:', error);
    throw error;
  }
}