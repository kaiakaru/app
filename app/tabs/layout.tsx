// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6ca0dc",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { backgroundColor: "#e3ecf2" },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
