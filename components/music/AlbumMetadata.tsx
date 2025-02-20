import { XStack, YStack, Text, Button } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { getAlbumMetadata } from "services/spotify/spotifyBase";
import { useQuery } from "@tanstack/react-query";

interface AlbumMetadataProps {
  albumId: string;
}

export default function AlbumMetadata({ albumId }: AlbumMetadataProps) {
  const { data } = useQuery({
    queryKey: ["albumMetadata", albumId],
    queryFn: async () => getAlbumMetadata(albumId),
  });

  if (!data) return null;

  return (
    <YStack space="$4" padding="$4" backgroundColor="$gray1" borderRadius="$4">
      <Text fontWeight="bold" fontSize="$5" color="$gray12" textAlign="center">
        Details
      </Text>

      <YStack space="$3">
        {[
          { label: "Release date", value: data.releaseDate },
          { label: "Format", value: data.format },
          { label: "Label", value: data.label },
        ].map(({ label, value }) => (
          <XStack
            key={label}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color="$gray10" fontSize="$3">
              {label}:
            </Text>
            <Text fontWeight="500" color="$gray12">
              {value}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}
