import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import { XStack, YStack, Text } from "tamagui";
import { SpotifyTrack } from "types/spotify/spotifyMusic";

interface TrackItemProps {
  track: SpotifyTrack;
  index: number;
  onPress?: () => void;
  navigation: any;
}

export const TopTrackItem: React.FC<TrackItemProps> = ({
  track,
  navigation,
}) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  const handlePress = () => {
    if (track.album?.id) {
      router.push({
        pathname: "/album",
        params: { id: track.album.id },
      });
    }
  };

  const albumImage = track.album?.images?.find((img) => img.width === 300)?.url;
  const router = useRouter();

  return (
    <Pressable onPress={handlePress}>
      <XStack
        alignItems="center"
        bg="$gray5"
        p="$3"
        borderRadius="$2"
        style={styles.container}
      >
        {albumImage && (
          <Image source={{ uri: albumImage }} style={styles.albumArt} />
        )}
        <YStack ml="$3" flex={1} overflow="hidden">
          <XStack justifyContent="space-between" alignItems="center">
            <Text
              color="white"
              fontWeight="600"
              numberOfLines={1}
              ellipsizeMode="tail"
              flex={1}
            >
              {track.name}
            </Text>
            <Text color="white" ml="$2">
              {formatDuration(track.duration_ms)}
            </Text>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <Text
              color="$white"
              numberOfLines={1}
              ellipsizeMode="tail"
              flex={1}
            >
              {track.artists.map((artist) => artist.name).join(", ")}
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
});

export default TopTrackItem;
