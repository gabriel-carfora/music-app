import React, { useEffect, useState } from "react";
import { getUserTopTracks } from "services/spotify/spotifyUserService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "config/firebase";
import { useAuth } from "hooks/auth/useAuth";
import { SpotifyTrack } from "types/spotify/spotifyMusic";
import { ProfileModule } from "./ProfileModule";
import {
  SpotifyTimeRange,
  SpotifyTopTracksProps,
} from "types/spotify/spotifyUser";
import TopTrackItem from "components/music/TopTrackItem";
import { useNavigation } from "expo-router";

export const SpotifyTopTracks: React.FC<SpotifyTopTracksProps> = ({
  timeRange,
}) => {
  const navigation = useNavigation();
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          setError("User data not found");
          setLoading(false);
          return;
        }

        const userData = userDoc.data();
        if (
          !userData?.spotifyConnected ||
          !userData?.spotifyTokens?.accessToken
        ) {
          setError("Spotify not connected");
          setLoading(false);
          return;
        }

        const data = await getUserTopTracks(
          userData.spotifyTokens.accessToken,
          timeRange
        );
        setTracks(data.items.slice(0, 5));
      } catch (err) {
        setError(
          `Failed to load tracks: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [user, timeRange]);

  const getTitleByTimeRange = (range: SpotifyTimeRange) => {
    const titles = {
      month: "Top Tracks (This Month)",
      sixmonths: "Top tracks (6 Months)",
      year: "Top tracks (This Year)",
    };
    return titles[range];
  };

  return (
    <ProfileModule
      title={getTitleByTimeRange(timeRange)}
      items={tracks}
      renderItem={(track, index) => (
        <TopTrackItem
          key={track.id}
          track={track}
          index={index}
          navigation={navigation}
        />
      )}
      loading={loading}
      error={error}
    />
  );
};
