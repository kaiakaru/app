// app/layout.tsx
import { Stack } from "expo-router";

// all screens are stack based
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false}} />;
}
