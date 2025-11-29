// app/auth/reset.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Keyboard,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    // Placeholder — add real reset logic later
    setSent(true);

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        {/* Back Button */}
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="#2973bcff" />
        </Pressable>

        <Text style={styles.appName}>Balance+</Text>

        <View style={styles.centerBox}>
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.description}>
            Enter your email and we’ll send you a reset link.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Pressable style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </Pressable>

          {/* Confirmation */}
          {sent && (
            <Text style={styles.confirmation}>
              Reset link sent! Check your inbox.
            </Text>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#acc7e3ff",
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  backButton: {
    width: "100%",
    marginTop: 20,
    marginBottom: -20,
    marginLeft: 15,
  },

  appName: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "700",
    color: "#2973bcff",
  },

  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 50,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },

  description: {
    color: "#f4f4f4",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    width: "80%",
  },

  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#6ca0dc",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  confirmation: {
    marginTop: 20,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});