import { YStack, Button, Text, Spinner } from "tamagui";
import { useEffect, useState } from "react";
import SpotifyTrackItem from "components/music/SpotifyTrackItem";
import { SpotifyTrack } from "types/spotify/spotifyMusic";
import { getAlbumTracks } from "services/spotify/spotifyBase";

interface TrackListDropdownProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  albumId: string;
}

export default function TrackListDropdown({
  isExpanded,
  setIsExpanded,
  albumId,
}: TrackListDropdownProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isExpanded && tracks.length === 0) {
      const fetchTracks = async () => {
        setLoading(true);
        try {
          const trackData = await getAlbumTracks(albumId);
          setTracks(trackData);
        } catch (err) {
          setError("Failed to load tracks");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchTracks();
    }
  }, [isExpanded, albumId]);

  return (
    <YStack marginVertical="$4" width="90%" alignSelf="center">
      <Button
        backgroundColor="$primary"
        padding="$3"
        borderRadius="$4"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text fontSize="$4" fontWeight="600" color="$color">
          {isExpanded ? "Hide Songs" : "Show Songs"}
        </Text>
      </Button>

      {isExpanded && (
        <YStack pt="$4" space="$0">
          {loading ? (
            <Spinner size="large" color="$primary" />
          ) : error ? (
            <Text color="$error">{error}</Text>
          ) : (
            tracks.map((track, index) => (
              <SpotifyTrackItem key={track.id} track={track} index={index} />
            ))
          )}
        </YStack>
      )}
    </YStack>
  );
}
