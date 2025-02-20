import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { YStack, Text, View } from "tamagui";
import { auth } from "config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "config/firebase";
import { SpotifyTokens, SpotifyUserProfile } from "types/spotify/spotifyUser";
import { SpotifyAuthButton } from "components/spotify/SpotifyAuthButton";
import { useSpotifyTokens } from "hooks/spotify/useSpotifyTokens";
import { AuthContext } from "contexts/AuthContext";
import { Toast, useToastController, useToastState } from "@tamagui/toast";

interface Props {
  onSuccess: () => void;
}

export const SpotifyLinkForm: React.FC<Props> = ({ onSuccess }) => {
  const toast = useToastController();
  const [isLinking, setIsLinking] = useState(false);
  const { saveTokens } = useSpotifyTokens();
  const { refreshProfile } = useContext(AuthContext);

  const handleAuthSuccess = async (
    profile: SpotifyUserProfile,
    tokens: SpotifyTokens
  ) => {
    setIsLinking(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user authenticated");

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          spotifyConnected: true,
          spotifyTokensUpdatedAt: serverTimestamp(),
          spotifyProfile: {
            id: profile.id,
            display_name: profile.display_name,
            email: profile.email,
            images: profile.images,
            updatedAt: serverTimestamp(),
          },
          spotifyTokens: tokens,
        },
        { merge: true }
      );

      await saveTokens(user.uid, tokens);
      refreshProfile();
      toast.show("Successfully linked!", {
        message: "Your Spotify account has been connected.",
        theme: ''
      });
      onSuccess();
    } catch (error) {
      console.error("Error updating Firebase:", error);
      toast.show("Failed to link account", {
        message: "Please try again later.",
        theme: "error",
      });
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <YStack
      width="100%"
      maxWidth={350}
      p="$4"
      borderRadius="$4"
      bg="$background"
      elevation="$4"
    >
      <YStack alignItems="center">
        <Text fontSize="$6" fontWeight="bold" mb="$4">
          Connect with Spotify
        </Text>
        <Text fontSize="$4" color="$gray10" textAlign="center" mb="$6">
          Link your Spotify account to unlock personalized music features
        </Text>
      </YStack>

      <YStack space="$4">
        <View backgroundColor="$gray3" p="$4" borderRadius="$3">
          <Text fontSize="$3" color="$gray10" mb="$2">
            By connecting, you'll get:
          </Text>
          <YStack space="$2">
            <Text fontSize="$3" color="$gray11">
              • Personalized music recommendations
            </Text>
            <Text fontSize="$3" color="$gray11">
              • Access to your Spotify playlists
            </Text>
            <Text fontSize="$3" color="$gray11">
              • Share your favorite tracks
            </Text>
            <Text fontSize="$3" color="$gray11">
              • View your listening history
            </Text>
          </YStack>
        </View>

        <YStack alignItems="center" mt="$2">
          <SpotifyAuthButton onAuthSuccess={handleAuthSuccess} />
        </YStack>
      </YStack>
    </YStack>
  );
};
