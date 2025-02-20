import "../tamagui-web.css";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "./Provider";
import { useTheme } from "tamagui";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Providers>
          <RootLayoutNav />
        </Providers>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={colorScheme === "light" ? "light-content" : "dark-content"}
      />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "",
            headerShown: false,
            headerShadowVisible: false,
            headerBackTitle: "<",
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            title: "Tamagui + Expo",
            presentation: "modal",
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            headerShown: false,
            title: "Login",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            presentation: "modal",
            headerShown: false,
            title: "Register",
          }}
        />
        <Stack.Screen
          name="album"
          options={{
            headerShown: true,
            title: "Album",
          }}
        />
        <Stack.Screen
          name="review"
          options={{
            presentation: "modal",
            headerShown: false,
            title: "Review",
          }}
        />
        <Stack.Screen
          name="spotify"
          options={{
            presentation: "modal",
            headerShown: false,
            title: "Spotify",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
