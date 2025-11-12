// app/auth/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hides default headers
        animation: "slide_from_right", // makes it feel smooth
      }}
    />
  );
}
