// app/auth/loading.tsx

import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';

export default function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>Balance+</Text>

      {/* Optional loader animation */}
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </SafeAreaView>
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
});
