// app/auth/login.tsx
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import {
  Keyboard,
  Pressable, SafeAreaView, StyleSheet, Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: add auth logic later
    router.replace("/tabs/home"); // navigates to main app
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.appName}>Balance+</Text>

        <View style={styles.centerBox}>
          <Text style={styles.title}>Welcome</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
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
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// Styles (same as before)
const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#acc7e3ff',
    flex: 1, 
    alignItems: 'center', 
    padding: 20 
  },
  appName: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2973bcff',
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: { 
    color: '#fff',
    fontSize: 26, 
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

