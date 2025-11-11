// app/index.tsx
import React, { useState } from 'react';
import HomeScreen from './pages/home';
import LoginScreen from './pages/login';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate a simple login state
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <HomeScreen />;
}


