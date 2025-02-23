import { useState, useEffect, useCallback, useRef } from 'react';
import { makeRedirectUri, useAuthRequest, CodeChallengeMethod } from 'expo-auth-session';
import Config from 'react-native-config';

export const useSpotifyLink = () => {
  const codeVerifierRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const clientId = Config.SPOTIFY_CLIENT_ID;
  const proxyURL = Config.PROXY_URL;


  const redirectUri = makeRedirectUri({
    scheme: 'exp',
    path: 'spotify-auth-callback'
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId!,
      scopes: ['user-read-email', 'user-top-read', 'playlist-read-private'],
      redirectUri,
      codeChallengeMethod: CodeChallengeMethod.S256,
      usePKCE: true,
    },
    {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    }
  );

  useEffect(() => {
    if (request?.codeVerifier) {
      codeVerifierRef.current = request.codeVerifier;
      setIsReady(true);
    }
  }, [request]);

  const getAuthTokens = async (code: string) => {
    if (!codeVerifierRef.current) {
      throw new Error('No code verifier available');
    }

    try {
      const response = await fetch(proxyURL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          code_verifier: codeVerifierRef.current,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description || data.error || 'Token exchange failed');
      }
      return data;
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  };

  const handlePromptAsync = useCallback(async () => {
    if (!isReady) {
      throw new Error('Auth request not ready');
    }
    codeVerifierRef.current = request?.codeVerifier || null;
    return promptAsync();
  }, [isReady, promptAsync, request]);

  return {
    request,
    response,
    promptAuthAsync: handlePromptAsync,
    getAuthTokens,
    redirectUri,
  };
};