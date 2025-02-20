import React, { useRef, useEffect } from "react";
import { Image } from "react-native";
import { XStack, View, Text, YStack } from "tamagui";
import { useAlbumDetails } from "hooks/useAlbumDetails";
import { MiniReviewProps, RatingEmoji } from "types/review";
import { useUser } from "hooks/useUser";
import { Animated, Easing } from "react-native";

export default function MiniReview({
  rating,
  text,
  spotifyAlbumId,
  userId,
  createdAt,
}: MiniReviewProps) {
  const { albumData } = useAlbumDetails(spotifyAlbumId);
  const { username, loading: userLoading } = useUser(userId);
  const rainbowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (rating >= 9.0) {
      Animated.loop(
        Animated.timing(rainbowAnimation, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    } else {
      rainbowAnimation.setValue(0);
    }

    return () => rainbowAnimation.stopAnimation();
  }, [rating]);

  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate();
    return d.toLocaleDateString();
  };

  const getRatingEmoji = (score: number): RatingEmoji[keyof RatingEmoji] => {
    if (score <= 2) return "🤮";
    if (score <= 4) return "🤢";
    if (score <= 6) return "😐";
    if (score <= 8) return "😊";
    return "🤩";
  };

  const getRatingColor = (score: number) => {
    if (score >= 9.0) {
      return rainbowAnimation.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
        outputRange: ["red", "orange", "yellow", "green", "blue", "violet"],
      });
    }

    const isLowScore = score <= 5;
    const ratio = isLowScore ? score / 5 : (score - 5) / 4;
    const red = isLowScore ? 255 : Math.round(255 * (1 - ratio));
    const green = isLowScore ? Math.round(255 * ratio) : 255;

    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <XStack
      alignItems="center"
      padding="$2"
      margin="$1"
      borderRadius="$4"
      overflow="hidden"
      backgroundColor="$background"
    >
      <View
        width={60}
        height={60}
        justifyContent="center"
        alignItems="center"
        marginRight="$2"
        borderRadius="$4"
        overflow="hidden"
      >
        <Image
          source={{
            uri: albumData?.images[0]?.url || "https://via.placeholder.com/60",
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <YStack flex={1}>
        <YStack flex={1} marginBottom="$0">
          <Text fontSize="$3" fontWeight="bold" color="$gray11">
            {userLoading ? "Loading..." : username}
          </Text>
          {albumData && <Text fontSize="$3">{albumData.name}</Text>}
          <Text fontSize="$2" color="$gray9">
            {formatDate(createdAt)}
          </Text>
        </YStack>
        <Text fontSize="$4">{text}</Text>
      </YStack>

      <View width={60} height={60} borderRadius="$4" overflow="hidden">
        <Animated.View
          style={{ flex: 1, backgroundColor: getRatingColor(rating) }}
        >
          <YStack alignItems="center">
            <Text fontSize="$8">{getRatingEmoji(rating)}</Text>
            <Text fontSize="$3" fontWeight="bold">
              {rating.toFixed(1)}
            </Text>
          </YStack>
        </Animated.View>
      </View>
    </XStack>
  );
}
