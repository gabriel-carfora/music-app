import { XStack } from "tamagui";
import { Disc3, Star, Info, ListMusic } from "@tamagui/lucide-icons";
import type { ViewStyle } from "react-native";

interface PagerIndicatorProps {
  totalPages: number;
  currentPage: number;
  style?: ViewStyle;
}

export default function PageIndicator({
  totalPages,
  currentPage,
  style,
}: PagerIndicatorProps) {
  const icons = [Disc3, Star, ListMusic];

  return (
    <XStack space="$4" justifyContent="center" style={style} padding="$2">
      {icons.map((Icon, index) => {
        const isActive = index === currentPage;
        return (
          <Icon
            key={index}
            size={24}
            color={isActive ? "black" : "black"}
            opacity={isActive ? 1 : 0.5}
            fill={isActive ? "$color" : "white"}
          />
        );
      })}
    </XStack>
  );
}
