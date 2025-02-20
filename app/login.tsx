import React from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { YStack, Text } from "tamagui";
import { LoginForm } from "components/auth/LoginForm";

export default function login() {
  const router = useRouter();
  const handleClose = () => router.dismiss();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        gap: 20,
      }}
      style={{ backgroundColor: "rgba(var(--secondary), 0.3)" }}
    >
      <LoginForm onClose={handleClose} />

      <YStack mt="$4">
        <Text>
          Don't have an account?{" "}
          <Text color="$blue10" onPress={() => router.push("/register")}>
            Register here
          </Text>
        </Text>
      </YStack>
    </ScrollView>
  );
}
