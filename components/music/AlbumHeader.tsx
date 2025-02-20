import React from "react";
import { Image } from "react-native";
import { YStack, Text } from "tamagui";
import { SpotifyAlbum } from "types/spotify/spotifyMusic";

interface AlbumHeaderProps {
  albumData: SpotifyAlbum;
  rating: number;
  setRating: (rating: number) => void;
  onReviewSubmitted?: () => void;
}

export const AlbumHeader: React.FC<AlbumHeaderProps> = ({
  albumData,
  rating,
  setRating,
  onReviewSubmitted,
}) => {
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      paddingBottom="$2"
      width="91.666667%"
      alignSelf="center"
    >
      <Image
        source={{ uri: albumData.images[0]?.url }}
        style={{ height: 384, width: 384, borderRadius: 8 }}
      />
      <YStack
        width="100%"
        paddingVertical="$4"
        marginTop="$5"
        backgroundColor="$background"
        borderRadius="$4"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
        elevation={5}
      >
        <Text
          fontSize="$6"
          fontWeight="bold"
          color="$color"
          marginBottom="$1"
          textAlign="center"
        >
          {albumData.name}
        </Text>
        <Text fontSize="$5" fontWeight="600" color="$color" textAlign="center">
          {albumData.artists[0]?.name}
        </Text>
        <Text fontSize="$4" color="$color" textAlign="center">
          {new Date(albumData.release_date).getFullYear()}
        </Text>
      </YStack>
    </YStack>
  );
};

export default AlbumHeader;
