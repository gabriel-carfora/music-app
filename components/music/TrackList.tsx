import { YStack, Text, Spinner, ScrollView } from "tamagui";
import { useEffect, useState } from "react";
import SpotifyTrackItem from "components/music/SpotifyTrackItem";
import { SpotifyTrack } from "types/spotify/spotifyMusic";
import { getAlbumTracks } from "services/spotify/spotifyBase";

interface TrackListProps {
  albumId: string;
}

export default function TrackList({ albumId }: TrackListProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [albumId]);

  return (
    <ScrollView>
      <YStack marginVertical="$4" width="90%" alignSelf="center">
        <YStack space="$0">
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
      </YStack>
    </ScrollView>
  );
}
