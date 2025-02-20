import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { YStack, Text, View } from "tamagui";
import { SpotifyLinkForm } from "components/auth/SpotifyLinkForm";

export default function Spotify() {
  const router = useRouter();

  const handleLinkSuccess = () => {
    router.dismissAll();
    router.replace("/");
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        gap: 20,
      }}
    >
      <SpotifyLinkForm onSuccess={handleLinkSuccess} />

      <YStack mt="$4">
        <Text color='black'>
          Want to link later?{" "}
          <Text color="$blue10" onPress={() => router.back()}>
            Skip for now
          </Text>
        </Text>
      </YStack>
    </ScrollView>
  );
}
