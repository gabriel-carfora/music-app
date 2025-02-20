import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import { XStack, YStack, Text } from "tamagui";
import { SpotifyTrack } from "types/spotify/spotifyMusic";

interface TrackItemProps {
  track: SpotifyTrack;
  index: number;
  onPress?: () => void;
}

const RainbowBorder: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const hueAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(hueAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(hueAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const interpolatedColor = hueAnimation.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [
      "rgb(255,0,0)",
      "rgb(255,165,0)",
      "rgb(255,255,0)",
      "rgb(0,255,0)",
      "rgb(0,0,255)",
      "rgb(238,130,238)",
    ],
  });

  return (
    <Animated.View
      style={[{ borderColor: interpolatedColor }, styles.borderContainer]}
    >
      {children}
    </Animated.View>
  );
};

export const SpotifyTrackItem: React.FC<TrackItemProps> = ({
  track,
  index,
  onPress,
}) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const popularity = track.popularity ?? 0;

    if (popularity > 70) {
      return <RainbowBorder>{children}</RainbowBorder>;
    }
    return <Animated.View style={styles.blueBorder}>{children}</Animated.View>;
  };

  return (
    <Pressable onPress={onPress}>
      <Wrapper>
        <XStack
          alignItems="center"
          bg="white"
          p="$3"
          borderRadius="$2"
          style={styles.container}
        >
          <Text
            color="white"
            fontSize="$3"
            mr="$3"
            width={24}
            textAlign="right"
          >
            {index + 1}
          </Text>
          <YStack flex={1} overflow="hidden">
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                color="black"
                fontWeight="900"
                numberOfLines={1}
                ellipsizeMode="tail"
                flex={1}
              >
                {track.name}
              </Text>
              <Text color="$gray8" ml="$2">
                {formatDuration(track.duration_ms)}
              </Text>
            </XStack>
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                color="$gray8"
                numberOfLines={1}
                ellipsizeMode="tail"
                flex={1}
              >
                {track.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </XStack>
          </YStack>
        </XStack>
      </Wrapper>
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
  },
  blueBorder: {
    marginBottom: 12,
  },
  borderContainer: {
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 12,
    shadowOpacity: 0.7,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
});

export default SpotifyTrackItem;
