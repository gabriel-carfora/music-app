import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from 'config/firebase';
import { SpotifyTokens } from 'types/spotify/spotifyUser';
import * as SecureStore from 'expo-secure-store';

const PROXY_URL = 'https://devproxy.carfora.xyz';
const REFRESH_THRESHOLD = 5 * 60 * 1000;

export const useSpotifyTokens = () => {
  const [currentTokens, setCurrentTokens] = useState<SpotifyTokens | null>(null);

  const saveTokens = async (uid: string, tokens: SpotifyTokens) => {
    await SecureStore.setItemAsync(`spotify_tokens_${uid}`, JSON.stringify(tokens));
    setCurrentTokens(tokens);
    
    await setDoc(doc(db, 'users', uid), {
      spotifyConnected: true,
      spotifyTokensUpdatedAt: serverTimestamp(),
    }, { merge: true });
  };

  const getStoredTokens = async (uid: string): Promise<SpotifyTokens | null> => {
    try {
      const tokensString = await SecureStore.getItemAsync(`spotify_tokens_${uid}`);
      return tokensString ? JSON.parse(tokensString) : null;
    } catch (error) {
      console.error('Error getting stored tokens:', error);
      return null;
    }
  };

  const refreshTokens = async (uid: string, refreshToken: string): Promise<SpotifyTokens | null> => {
    try {
      const response = await fetch(`${PROXY_URL}/api/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) throw new Error('Failed to refresh token');

      const data = await response.json();
      const tokens: SpotifyTokens = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken,
        expiresAt: Date.now() + (data.expires_in * 1000),
      };

      await saveTokens(uid, tokens);
      return tokens;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      return null;
    }
  };

  const getValidToken = async (uid: string): Promise<string | null> => {
    try {
      let tokens = currentTokens || await getStoredTokens(uid);
      
      if (!tokens) return null;

      if (tokens.expiresAt - Date.now() <= REFRESH_THRESHOLD) {
        tokens = await refreshTokens(uid, tokens.refreshToken);
      }

      return tokens?.accessToken || null;
    } catch (error) {
      console.error('Error getting valid token:', error);
      return null;
    }
  };

  return {
    currentTokens,
    saveTokens,
    getValidToken,
  };
};