// app/index.tsx
import React, { useState } from 'react';
import LoginScreen from './auth/login';
import SignUpScreen from './auth/signup';
import HomeScreen from './pages/home';

export default function Index() {
  const [screen, setScreen] = useState<'login' | 'signup' | 'home'>('login');

  if (screen === 'login') {
    return (
      <LoginScreen
        onLogin={() => setScreen('home')}
        goToSignUp={() => setScreen('signup')}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <SignUpScreen
        onSignUp={() => setScreen('home')}
        goToLogin={() => setScreen('login')}
      />
    );
  }

  return <HomeScreen />;
}

