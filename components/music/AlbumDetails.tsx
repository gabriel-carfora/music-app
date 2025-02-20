import { ActivityIndicator, View } from "react-native";
import { YStack, Text } from "tamagui";
import { useAlbumDetails } from "hooks/useAlbumDetails";
import AlbumHeader from "components/music/AlbumHeader";
import AlbumMetadata from "./AlbumMetadata";

interface AlbumDetailsProps {
  albumId: string;
  onReviewSubmitted?: () => void;
}

const LoadingState = () => (
  <YStack flex={1} justifyContent="center" alignItems="center">
    <ActivityIndicator size="large" color="$color" />
  </YStack>
);

const ErrorState = ({ message }: { message: string }) => (
  <YStack
    flex={1}
    justifyContent="center"
    alignItems="center"
    p="$5"
    bg="$background"
  >
    <Text color="$red10" textAlign="center" fontSize="$4">
      {message}
    </Text>
  </YStack>
);

export default function AlbumDetails({
  albumId,
}: AlbumDetailsProps) {
  const { albumData, loading, error } = useAlbumDetails(albumId);

  if (loading) return <LoadingState />;
  if (error || !albumData)
    return <ErrorState message={error || "Album not found"} />;

  return (
    <View>
      <AlbumHeader albumData={albumData} rating={0} setRating={() => {}} />

      <AlbumMetadata albumId={albumId}></AlbumMetadata>
    </View>
  );
}
