import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { YStack, Text, Spinner } from "tamagui";
import MiniReview from "../../components/reviews/MiniReview";
import { useProfile } from "../../hooks/useProfile";
import { useLocalSearchParams } from "expo-router";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { SpotifyTopTracks } from "components/profile/TopTracks";
import { ProfileModule } from "components/profile/ProfileModule";

export default function profile() {
  const { refresh } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const { userProfile, reviews, loading, error, fetchUserData } = useProfile();

  useEffect(() => {
    fetchUserData();
  }, [refresh, fetchUserData]);

  if (loading) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="$background"
      >
        <Spinner size="large" color="#1DB954" />
      </YStack>
    );
  }

  if (error || !userProfile) {
    return (
      <YStack p="$4" alignItems="center" bg="$background">
        <Text color="$red10" fontSize="$2">
          {error || "User profile not found."}
        </Text>
      </YStack>
    );
  }

  const EmptyReviews = () => (
    <Text fontSize="$2" color="$secondary" textAlign="center">
      You haven't submitted any reviews yet.
    </Text>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <YStack flex={1} alignItems="center" px="$6" py="$6">
        <YStack width="100%" maxWidth={350}>
          <ProfileHeader
            username={userProfile.username}
            profilePic={userProfile.profilePic}
            reviewCount={reviews.length}
          />
          <YStack mt="$5">
            <ProfileModule
              title="Your Reviews"
              items={reviews}
              renderItem={(review) => (
                <MiniReview
                  key={review.id}
                  rating={review.rating}
                  text={review.text ?? ""}
                  spotifyAlbumId={review.spotifyAlbumId}
                  userId={user?.uid || ""}
                  createdAt={review.createdAt}
                  albumName=""
                />
              )}
              loading={false}
              error={null}
              EmptyComponent={EmptyReviews}
            />
          </YStack>
          <YStack mt="$5">
            <SpotifyTopTracks timeRange="month" />
          </YStack>
          <YStack mt="$5"></YStack>

          <SpotifyTopTracks timeRange="sixmonths" />
          <YStack mt="$5"></YStack>
          <SpotifyTopTracks timeRange="year" />
          <YStack mt="$5"></YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
