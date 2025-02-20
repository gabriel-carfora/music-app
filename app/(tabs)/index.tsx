import * as React from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { Link } from "expo-router";

const GITHUB_AVATAR_URI = "https://attic.sh/e9i0jm6uhsc6th0sxrnql6ou3exp";

const Screen: React.FC = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        gap: 16,
      }}
    >
      <YStack
        width="100%"
        maxWidth={350}
        borderRadius="$4"
        bg="$background"
        justifyContent="center"
        p="$4"
      >
        <YStack alignItems="center" flex={1} justifyContent="center" pb="$4">
          <YStack width={96} height={96} borderRadius={48} overflow="hidden">
            <Image
              source={{ uri: GITHUB_AVATAR_URI }}
              style={{ width: "100%", height: "100%" }}
              defaultSource={require("")}
            />
          </YStack>

          <YStack>
            <Text fontSize="$6" textAlign="center" mb="$2" fontWeight="bold">
              Untitled Music App
            </Text>
            <Text fontSize="$4" textAlign="center" color="$gray10">
              Something something slogan slogan etc
            </Text>
          </YStack>
        </YStack>

        <XStack justifyContent="space-around" gap="$3">
          <Link href="/login" asChild>
            <Button
              flex={1}
              backgroundColor="$blue10"
              padding="$3"
              pressStyle={{ opacity: 0.8 }}
            >
              <Text color="white" fontWeight="bold">
                Login
              </Text>
            </Button>
          </Link>

          <Link href="/register" asChild>
            <Button
              flex={1}
              backgroundColor="$red10"
              padding="$3"
              pressStyle={{ opacity: 0.8 }}
            >
              <Text color="white" fontWeight="bold">
                Register
              </Text>
            </Button>
          </Link>
        </XStack>
      </YStack>
    </ScrollView>
  );
};

export default Screen;
