import React, { useState, useContext } from "react";
import {
  Slider,
  SliderThumb,
  SliderTrack,
  SliderTrackActive,
} from "@tamagui/slider";
import { Stack, Text, Button, XStack, YStack, Input } from "tamagui";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "contexts/AuthContext";
import { useToastController } from "@tamagui/toast";

interface RatingSliderProps {
  albumId: string;
  onReviewSubmitted?: () => void;
}

export default function RatingSliderDropdown({
  albumId,
  onReviewSubmitted,
}: RatingSliderProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AuthContext);
  const toast = useToastController();
  const getScaledRating = (value: number) => {
    return value / 10;
  };

  const getEmoji = (value: number) => {
    if (value <= 2) return "🤮";
    if (value <= 4) return "🤢";
    if (value <= 6) return "😐";
    if (value <= 8) return "😊";
    return "🤩";
  };

  const getColor = (value: number) => {
    if (value <= 50) {
      const ratio = value / 50; 
      const green = Math.round(255 * ratio);
      return `rgb(255, ${green}, 0)`;
    } else {
      const ratio = (value - 50) / 50; 
      const red = Math.round(255 * (1 - ratio));
      return `rgb(${red}, 255, 0)`;
    }
  };

  const handleRatingChange = (value: number[]) => {
    const integerValue = value[0];
    setRating(integerValue);
  };

  const handleSubmitReview = async () => {
    const scaledRating = getScaledRating(rating);
    if (!user) {
      toast.show("Authentication Required", {
        message: "You must be logged in to submit a review.",
        theme: "toast_error",
      });
      return;
    }
    if (scaledRating === 0) {
      toast.show("Rating Required", {
        message: "Please assign a rating before submitting.",
        theme: "toast_error",
      });
      return;
    }
    setSubmitting(true);
    try {
      const reviewsRef = collection(db, "reviews");
      const q = query(
        reviewsRef,
        where("userId", "==", user.uid),
        where("spotifyAlbumId", "==", albumId)
      );
      const querySnapshot = await getDocs(q);
      const reviewData = {
        userId: user.uid,
        spotifyAlbumId: albumId,
        rating: scaledRating,
        text: reviewText.trim(),
        createdAt: Timestamp.fromDate(new Date()),
      };
      if (!querySnapshot.empty) {
        const reviewDoc = querySnapshot.docs[0];
        const reviewDocRef = doc(db, "reviews", reviewDoc.id);
        await updateDoc(reviewDocRef, reviewData);
        toast.show("Review Updated", {
          message: "Your review has been updated successfully!",
          theme: "toast_success",
        });
      } else {
        await addDoc(reviewsRef, reviewData);
        toast.show("Review Submitted", {
          message: "Your review has been submitted successfully!",
          theme: "toast_success",
        });
      }
      setSubmitted(true);
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setReviewText("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.show("Submission Failed", {
        message: "Failed to submit your review. Please try again.",
        theme: "toast_error",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <YStack space="$4">
      <XStack justifyContent="center" alignItems="center" space="$2">
        <Text fontWeight="bold" fontSize="$6" color="$color">
          {getScaledRating(rating).toFixed(1)}
        </Text>
        <Text fontSize="$6">{getEmoji(getScaledRating(rating))}</Text>
      </XStack>
      <Stack backgroundColor="$background" padding="$4" borderRadius="$3">
        <Slider
          defaultValue={[0]}
          min={0}
          max={100}
          step={1}
          value={[rating]}
          onValueChange={handleRatingChange}
        >
          <SliderTrack>
            <SliderTrackActive backgroundColor={getColor(rating)} />
          </SliderTrack>
          <SliderThumb
            index={0}
            size="$2"
            backgroundColor="$color"
            bordered
            circular
          />
        </Slider>
        <YStack space="$2" marginTop="$4">
          <Input
            multiline
            height={100}
            placeholder="Write your review here (optional)"
            value={reviewText}
            onChangeText={setReviewText}
            maxLength={1000}
            textAlignVertical="top"
            padding="$3"
            backgroundColor="$background"
            borderRadius="$3"
          />
          <Text color="$gray11" fontSize="$2" textAlign="right">
            {reviewText.length}/1000
          </Text>
        </YStack>
      </Stack>
      <Button
        marginHorizontal="$4"
        backgroundColor={
          submitting || rating === 0 || submitted ? "$gray8" : "white"
        }
        disabled={submitting || rating === 0 || submitted}
        onPress={handleSubmitReview}
        pressStyle={{ opacity: 0.8 }}
      >
        <Text color="black" fontWeight="600">
          {submitting
            ? "Submitting..."
            : submitted
            ? "Submitted!"
            : "Submit Review"}
        </Text>
      </Button>
    </YStack>
  );
}
