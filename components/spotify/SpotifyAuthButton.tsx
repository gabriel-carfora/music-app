import { AuthSessionResult } from "expo-auth-session";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Text, YStack } from "tamagui";
import { useSpotifyLink } from "hooks/spotify/useSpotifyLink";
import { getUserProfile } from "services/spotify/spotifyUserService";
import { SpotifyTokens, SpotifyUserProfile } from "types/spotify/spotifyUser";

interface Props {
  onAuthSuccess?: (profile: SpotifyUserProfile, tokens: SpotifyTokens) => void;
}

export const SpotifyAuthButton: React.FC<Props> = ({ onAuthSuccess }) => {
  const { request, response, promptAuthAsync, getAuthTokens } =
    useSpotifyLink();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuth = useCallback(
    async (response: AuthSessionResult) => {
      if (isProcessing || response.type !== "success" || !response.params.code)
        return;

      setIsProcessing(true);
      setIsLoading(true);
      setError(null);

      try {
        const tokenData = await getAuthTokens(response.params.code);
        const tokens: SpotifyTokens = {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token || "",
          expiresAt: Date.now() + tokenData.expires_in * 1000,
        };

        const profile = await getUserProfile(tokens.accessToken);
        onAuthSuccess?.(profile, tokens);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Authentication failed";
        console.error("Authentication error:", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        setIsProcessing(false);
      }
    },
    [getAuthTokens, onAuthSuccess]
  );

  useEffect(() => {
    if (response && !isProcessing && response.type === "success") {
      const code = response.params.code;
      if (!code) return;
      setIsProcessing(true);
      setIsLoading(true);
      setError(null);
      getAuthTokens(code)
        .then((tokenData) => {
          const tokens: SpotifyTokens = {
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token || "",
            expiresAt: Date.now() + tokenData.expires_in * 1000,
          };
          return getUserProfile(tokens.accessToken).then((profile) =>
            onAuthSuccess?.(profile, tokens)
          );
        })
        .catch((err) => {
          const errorMessage =
            err instanceof Error ? err.message : "Authentication failed";
          console.error("Authentication error:", errorMessage);
          setError(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
          setIsProcessing(false);
        });
    }
  }, [response]);

  const handlePress = async () => {
    setError(null);
    setIsProcessing(false);
    try {
      await promptAuthAsync();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start authentication"
      );
    }
  };

  return (
    <YStack>
      <Button
        onPress={handlePress}
        disabled={!request || isLoading}
        backgroundColor={isLoading ? "$gray5" : "#1DB954"}
        padding="$3"
        borderRadius="$3"
      >
        <Text color="white" fontWeight="600" textAlign="center">
          {isLoading
            ? "Connecting..."
            : error
            ? "Try Again"
            : "Connect Spotify"}
        </Text>
      </Button>
      {error && (
        <Text color="$red10" mt="$2" textAlign="center">
          {error}
        </Text>
      )}
    </YStack>
  );
};
