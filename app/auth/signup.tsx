// app/auth/signup.tsx
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from 'react';
import {
  Alert, Keyboard,
  Platform,
  Pressable,
  StyleSheet, Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// TEST
const fallback = Platform.select({
  ios: 'http://localhost:5000',
  android: 'http://10.0.2.2:5000',
  default: 'http://192.168.1.152:5000',
});

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? fallback;
const AUTH_BASE_URL = `${API_URL}/auth`;

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null);


    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${AUTH_BASE_URL}/signup`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.error || "Sign up failed. Please try again.";
        setError(message);
        return;
      }
      // backend should return token email userId on successful signup
      const { token, userId, email: returnedEmail } = data;

      if (!token || !userId) {
        setError("Invalid response from server. Please try again.");
        return;
      }

      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("userId", String(userId));
      await SecureStore.setItemAsync("userEmail", String(returnedEmail || trimmedEmail));

      Alert.alert("Success", "Account created successfully!");

    router.replace("/tabs/home");
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.appName}>Balance+</Text>

        <View style={styles.centerBox}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
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

          <Pressable style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/auth/login" style={styles.loginButtonText}>
              Log In
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
