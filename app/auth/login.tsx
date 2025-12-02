// app/auth/login.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  Pressable, StyleSheet, Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const fallback = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
  default: 'http://172.20.10.4:3000',
});

const API_URL = "https://plunderable-invariantly-silas.ngrok-free.dev";
const AUTH_BASE_URL = `${API_URL}/auth`;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      Alert.alert("Access Denied", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.error || data?.message ||  "Login failed. Please try again.";
        throw new Error(message);
      }

     const { token, userId, email: returnedEmail } = data;

     if (!token || !userId) {
        throw new Error("Invalid response from server. Please try again.");
      }
      
      const authUser = {
        id: userId,
        email: returnedEmail || trimmedEmail,
      };

      //const { token, user } = await res.json();
      await AsyncStorage.setItem('@auth_token', token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(authUser));


    router.replace('/tabs/home');
    } catch (e: any) {
      Alert.alert("Login Failed", e?.message ?? "An unexpected error occurred.");
    } finally {
      setLoading(false);
    } // navigates to main app
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.appName}>Balance+</Text>

        <View style={styles.centerBox}>
          <Text style={styles.title}>Welcome Back</Text>

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

          <Pressable
            onPress={() => router.push("/auth/reset-password")}
            style={styles.forgotPasswordBtn}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

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
    marginTop: 50,
    fontSize: 30,
    fontWeight: '700',
    color: '#2973bcff',
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
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
    forgotPasswordBtn: {
    width: "80%",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#2973bcff",
    fontWeight: "600",
    fontSize: 14,
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

