import { Image } from "react-native";
import { YStack, XStack, Text, View } from "tamagui";

interface ProfileHeaderProps {
  username: string;
  profilePic: string;
  reviewCount: number;
}

export function ProfileHeader({
  username,
  profilePic,
  reviewCount,
}: ProfileHeaderProps) {
  return (
    <YStack
      width="100%"
      mt="$6"
      maxWidth={350}
      p="$6"
      borderRadius="$4"
      bg="$background"
      elevation="$4"
    >
      <YStack alignItems="center">
        <View width={96} height={96} borderRadius={48} overflow="hidden">
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              style={{ width: "100%", height: "100%" }}
              defaultSource={require("")}
            />
          ) : (
            <YStack
              flex={1}
              backgroundColor="$gray4"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="$8" fontWeight="600">
                {username.charAt(0).toUpperCase()}
              </Text>
            </YStack>
          )}
        </View>

        <YStack p="$3" />

        <Text fontSize="$6" fontWeight="bold">
          {username}
        </Text>

        <Text fontSize="$4" color="$gray10" fontWeight="300">
          Music guy
        </Text>
      </YStack>

      <YStack mt="$4">
        <XStack justifyContent="space-around" gap="$3">
          <YStack alignItems="center">
            <Text fontSize="$6" fontWeight="600">
              {reviewCount}
            </Text>
            <Text fontSize="$6">Reviews</Text>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
}
