// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // later check AsyncStorage or Firebase auth here

  if (isLoggedIn) {
    return <Redirect href="/tabs/home" />;
  } else {
    
    return <Redirect href="/auth/welcome" />;
  }
}

