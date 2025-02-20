import { useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { StyleSheet } from "react-native";
import AlbumDetails from "components/music/AlbumDetails";
import AlbumReviews from "components/music/AlbumReviews";
import PageIndicator from "components/ui/PageIndicator";
import TrackList from "components/music/TrackList";

function HeaderIndicator({ currentPage }: { currentPage: number }) {
  return (
    <PageIndicator
      totalPages={3}
      currentPage={currentPage}
      style={styles.headerIndicator}
    />
  );
}

export default function Album() {
  const { id } = useLocalSearchParams();
  console.log("Album route - received id:", id, "type:", typeof id);
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderIndicator currentPage={currentPage} />,
          headerBackTitle: "Back",
        }}
      />
      <YStack
        flex={1}
        backgroundColor="$background"
        paddingTop="$2"
        paddingBottom={insets.bottom}
      >
        <PagerView
          style={styles.pager}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          <AlbumDetails key="1" albumId={id as string} />
          <AlbumReviews key="2" albumId={id as string} />
          <TrackList key="3" albumId={id as string} />
        </PagerView>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
  headerIndicator: {
    paddingHorizontal: 16,
  },
});
