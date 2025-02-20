import { memo } from "react";
import { Image } from "react-native";
import { XStack, YStack, Text, Stack, styled } from "tamagui";
import { AlbumItemProps } from "types/search";

const StyledImage = styled(Image, {
  width: 60,
  height: 60,
});

const StyledPressable = styled(XStack, {
  backgroundColor: "black",
  borderWidth: 1,
  borderRadius: 5,
  borderColor: "black",
  padding: "$2",
  marginBottom: "$1",
  pressStyle: {
    opacity: 0.7,
  },
});

export const AlbumItem = memo(({ item, onPress }: AlbumItemProps) => (
  <StyledPressable onPress={() => onPress(item)}>
    <StyledImage
      source={{ uri: item.images[0]?.url }}
      alt={`${item.name} cover`}
      defaultSource={require("")}
      borderRadius={4}
    />

    <YStack flex={1} marginLeft="$3" justifyContent="center">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        fontSize="$4"
        fontWeight="bold"
        color="white"
        marginBottom="$0"
      >
        {item.name}
      </Text>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        fontSize="$4"
        fontWeight="$6"
        color="white"
      >
        {item.artists.map((artist) => artist.name).join(", ")}
      </Text>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        fontSize="$4"
        fontWeight="$6"
        color="black"
      >
        {new Date(item.release_date).getFullYear()}
      </Text>
    </YStack>
  </StyledPressable>
));
