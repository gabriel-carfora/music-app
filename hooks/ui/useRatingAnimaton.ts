import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const useRatingAnimation = (rating: number) => {
  const rainbowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (rating >= 9.0) {
      Animated.loop(
        Animated.timing(rainbowAnimation, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    } else {
      rainbowAnimation.stopAnimation();
    }
  }, [rating]);

  const interpolatedColor = rainbowAnimation.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'],
  });

  return interpolatedColor;
};