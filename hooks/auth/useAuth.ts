import { useContext } from 'react';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { AuthContext } from 'contexts/AuthContext';

export const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  return { user, loading };
};

export const useSpotifyAuth = () => {
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  return useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '7764c0023ce640209ee36fed57c1966d',
      scopes: [
        'user-read-email',
        'user-top-read',
        'user-library-read',
        'user-read-recently-played',
        'user-follow-read',
      ],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'your.app.scheme' 
      }),
    },
    discovery
  );
};