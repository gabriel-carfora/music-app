import React, { useState } from "react";
import { View, Input, Text, Button, Spinner, YStack, XStack } from "tamagui";
import { useLogin } from "hooks/auth/useLogin";

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useLogin();

  const handleSubmit = async () => {
    setError(null);

    if (!form.email.trim() || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    const success = await login({
      email: form.email,
      password: form.password,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <YStack
      width="100%"
      maxWidth={350}
      padding="$4"
      borderRadius="$4"
      backgroundColor="$background"
      elevation="$4"
    >
      <YStack alignItems="center">
        <Text fontSize="$6" fontWeight="bold" marginBottom="$4">
          Welcome back!
        </Text>
        <Text fontSize="$4" color="$gray10">
          Please login to continue
        </Text>
      </YStack>

      <YStack paddingVertical="$4">
        {error && (
          <YStack
            marginBottom="$4"
            padding="$3"
            backgroundColor="$red3"
            borderWidth={1}
            borderColor="$red7"
            borderRadius="$2"
          >
            <Text color="$red10">{error}</Text>
          </YStack>
        )}

        <Input
          marginBottom="$4"
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={isLoading}
        />

        <Input
          marginBottom="$4"
          placeholder="Password"
          value={form.password}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, password: text }))
          }
          secureTextEntry
          autoCapitalize="none"
          disabled={isLoading}
        />
      </YStack>

      <XStack justifyContent="center" marginTop="$4">
        <Button
          minWidth={120}
          disabled={isLoading}
          onPress={handleSubmit}
          backgroundColor={isLoading ? "$gray5" : "$blue10"}
          pressStyle={{ opacity: 0.8 }}
        >
          {isLoading ? (
            <Spinner color="$gray11" />
          ) : (
            <Text color="white" fontWeight="600">
              Login
            </Text>
          )}
        </Button>
      </XStack>
    </YStack>
  );
};
