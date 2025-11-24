// app/tabs/settings.tsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>App-level preferences and account settings go here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#96B9E7' },
  inner: { padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#2973bcff', marginBottom: 8 },
  subtitle: { color: '#fff', fontSize: 16 },
});
