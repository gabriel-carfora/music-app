import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, YStack, Button, Card } from "tamagui";
import MiniReview from "components/reviews/MiniReview";
import { ReviewListProps } from "types/review";
import { useReviews } from "hooks/useReviews";
import { RootStackParamList } from "types/navigation";

interface LoadingStateProps {
  message: string;
  isError?: boolean;
}

function LoadingState({ message, isError }: LoadingStateProps) {
  return (
    <YStack padding="$4" alignItems="center">
      <Text fontSize="$3" color={isError ? "$red10" : "$secondary"}>
        {message}
      </Text>
    </YStack>
  );
}

export default function MiniReviews({ albumId }: ReviewListProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { reviews, loading, error } = useReviews(albumId);

  const handleShowAll = () => {
    navigation.navigate("review", { albumId });
  };

  if (loading) {
    return (
      <YStack padding="$4" alignItems="center">
        <ActivityIndicator size="small" color="$green10" />
      </YStack>
    );
  }

  if (error) return <LoadingState message={error} isError />;
  if (reviews.length === 0)
    return <LoadingState message="No reviews yet. Be the first to review!" />;

  return (
    <YStack marginTop="$4" width="90%" alignSelf="center">
      <Card backgroundColor="$backgroundElevated" padding="$4">
        <Text
          fontSize="$6"
          fontWeight="bold"
          marginBottom="$3"
          color="$primary"
        >
          Top Reviews
        </Text>
        <View>
          {reviews.map((item) => (
            <MiniReview
              key={item.id}
              rating={item.rating}
              text={item.text || ""}
              spotifyAlbumId={item.spotifyAlbumId}
              userId={item.userId}
              createdAt={item.createdAt}
              albumName=""
            />
          ))}
        </View>
      </Card>

      <Button
        marginTop="$2"
        backgroundColor="$primary"
        borderRadius="$4"
        onPress={handleShowAll}
      >
        <Text fontSize="$3" fontWeight="600" color="$textPrimary">
          Show All Reviews ({reviews.length})
        </Text>
      </Button>
    </YStack>
  );
}
