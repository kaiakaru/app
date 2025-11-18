// app/auth/login.tsx
import { router } from "expo-router";
import React from 'react';
import {
    Keyboard,
    Pressable, SafeAreaView, StyleSheet, Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function WelcomeScreen() {
  const handleLogin = () => {
    // TODO: add auth logic later
    router.replace("/auth/login"); // navigates to main app
  };
  const handleSignup = () => {
    //add auth logic
    router.replace("/auth/signup")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.appName}>Balance+</Text>

        <View style={styles.centerBox}>
          <Text style={styles.title}>Welcome</Text>

          <Pressable style={styles.buttonOne} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>

          <Pressable style={styles.buttonTwo} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
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
  buttonOne: {
    backgroundColor: '#6ca0dc',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  buttonTwo: {
    marginTop: 10,
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
});

