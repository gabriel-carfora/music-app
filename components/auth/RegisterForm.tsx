import { useState } from "react";
import { YStack, Input, Text, Button } from "tamagui";
import { useRegister } from "hooks/auth/useRegister";
import { useRouter } from "expo-router";

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, isLoading, errors } = useRegister();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const success = await register(form);
      if (success) {
        router.push("/spotify");
      }
    } catch (error) {
    }
  };

  return (
    <YStack
      width="100%"
      maxWidth={350}
      p="$4"
      borderRadius="$4"
      bg="$background"
      elevation="$4"
    >
      <YStack alignItems="center">
        <Text fontSize="$6" fontWeight="bold" mb="$4">
          Almost there!
        </Text>
        <Text fontSize="$4" color="$gray10">
          Just need a few details
        </Text>
      </YStack>

      <Input
        mt="$4"
        placeholder="Username"
        value={form.username}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, username: text }))
        }
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errors.username && (
        <Text color="$red10" fontSize="$2" mt="$1">
          {errors.username}
        </Text>
      )}

      <Input
        mt="$4"
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <Text color="$red10" fontSize="$2" mt="$1">
          {errors.email}
        </Text>
      )}

      <Input
        mt="$4"
        placeholder="Password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry
        autoCapitalize="none"
      />
      {errors.password && (
        <Text color="$red10" fontSize="$2" mt="$1">
          {errors.password}
        </Text>
      )}

      <Input
        mt="$4"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, confirmPassword: text }))
        }
        secureTextEntry
        autoCapitalize="none"
      />
      {errors.confirmPassword && (
        <Text color="$red10" fontSize="$2" mt="$1">
          {errors.confirmPassword}
        </Text>
      )}

      <YStack alignItems="center" mt="$6">
        <Button
          onPress={handleSubmit}
          disabled={isLoading}
          backgroundColor={isLoading ? "$gray5" : "$blue10"}
          padding="$3"
          borderRadius="$3"
        >
          <Text color="white" fontWeight="600">
            {isLoading ? "Registering..." : "Register"}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};
