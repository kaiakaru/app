// app/auth/login.tsx
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: add auth logic later
    router.replace("/tabs/home"); // navigates to main app
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account?</Text>
        <Link href="/auth/signup" style={styles.signUpButtonText}>
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
}

// Styles (same as before)
const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#acc7e3ff',
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    color: '#fff',
    fontSize: 28, 
    fontWeight: '700', 
    marginBottom: 30 
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6ca0dc',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600' 
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

