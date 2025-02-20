import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { YStack, XStack, styled, Input } from "tamagui";
import { useSearch } from "hooks/useSearch";
import { AlbumItem } from "components/search/AlbumItem";
import { Text } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StyledInput = styled(Input, {
  height: 48,
  paddingHorizontal: "$4",
  backgroundColor: "black",
  color: "black",
  placeholderTextColor: "gray",
});

const EmptyStateContainer = styled(YStack, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: "$4",
});

const ErrorContainer = styled(YStack, {
  paddingHorizontal: "$4",
  paddingVertical: "$2",
  marginBottom: "$2",
});

export default function Search() {
  const insets = useSafeAreaInsets();
  const {
    searchQuery,
    setSearchQuery,
    albums,
    loading,
    refreshing,
    error,
    handleRefresh,
    handleAlbumPress,
  } = useSearch();

  const renderEmptyState = () => {
    if (!loading) {
      return (
        <EmptyStateContainer>
          <Text color="$gray11" fontSize="$5" textAlign="center">
            {searchQuery.trim()
              ? "No albums found. Try a different search."
              : "Start typing to search for albums..."}
          </Text>
        </EmptyStateContainer>
      );
    }

    return (
      <EmptyStateContainer>
        <ActivityIndicator size="large" color="black" />
      </EmptyStateContainer>
    );
  };

  return (
    <YStack flex={1} paddingTop={insets.top}>
      <YStack paddingHorizontal="$4" paddingBottom="$2" paddingTop="$2">
        <StyledInput
          placeholder="Search for an album..."
          color="white"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </YStack>

      {error && (
        <ErrorContainer>
          <Text color="$red10" textAlign="center">
            {error}
          </Text>
        </ErrorContainer>
      )}

      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <AlbumItem item={item} onPress={handleAlbumPress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexGrow: 1,
          paddingBottom: insets.bottom
        }}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </YStack>
  );
}
