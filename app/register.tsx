import React from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { YStack, Text } from "tamagui";
import { RegisterForm } from "components/auth/RegisterForm";

export default function register() {
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    router.dismissAll();
    router.replace("/");
  };

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
      <RegisterForm onSuccess={handleRegistrationSuccess} />

      <YStack mt="$4">
        <Text>
          Already have an account?{" "}
          <Text color="$blue10" onPress={() => router.push("/login")}>
            Login here
          </Text>
        </Text>
      </YStack>
    </ScrollView>
  );
}
