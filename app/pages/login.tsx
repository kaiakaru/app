// app/auth/login.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

      <Pressable style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      {/* Sign Up Section */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <Pressable 
          onPress={() => navigation.navigate('signup')} // navigate to Signup screen
          style={styles.signUpButton}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

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
  signUpButton: {
    // optional styling for the sign up pressable
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline', // makes it look like a link
  },
});
