import MiniReviews from "components/reviews/MiniReviews";
import RatingSliderDropdown from "components/reviews/RatingSlider";
import React from "react";
import { YStack, Text, Button } from "tamagui";

interface AlbumReviewsProps {
  albumId: string;
  onReviewSubmitted?: () => void;
}

export default function AlbumReviews({
  albumId,
  onReviewSubmitted,
}: AlbumReviewsProps) {
  return (
    <YStack padding="$4" space="$4" flex={1} backgroundColor="$background">
      <Text fontSize="$8" fontWeight="bold">
        Reviews
      </Text>
      <RatingSliderDropdown albumId={albumId}></RatingSliderDropdown>
      <MiniReviews albumId={albumId} />
    </YStack>
  );
}
