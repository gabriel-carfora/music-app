import React from "react";
import { YStack, Text, Spinner } from "tamagui";

interface ProfileModuleProps {
  title: string;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  loading?: boolean;
  error?: string | null;
  EmptyComponent?: React.FC;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({
  title,
  items,
  renderItem,
  loading = false,
  error = null,
  EmptyComponent,
}) => {
  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="#1DB954" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack p="$4">
        <Text color="$red10" textAlign="center">
          {error}
        </Text>
      </YStack>
    );
  }

  return (
    <YStack
      width="100%"
      maxWidth={350}
      p="$4"
      bg="$black3"
      borderRadius="$4"
      elevation="$4"
    >
      <Text color="white" fontSize="$6" fontWeight="bold" mb="$4">
        {title}
      </Text>
      {items.length === 0 && EmptyComponent ? (
        <EmptyComponent />
      ) : (
        items.map((item, index) => renderItem(item, index))
      )}
    </YStack>
  );
};
