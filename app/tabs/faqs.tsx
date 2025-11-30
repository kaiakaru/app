// app/tabs/faqs.tsx
import { router } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FAQs() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Balance+ Header */}
      <Pressable onPress={() => router.push("/tabs/home")}>
        <Text style={styles.header}>Balance+</Text>
      </Pressable>

      <View style={styles.inner}>
        <Text style={styles.title}>FAQs</Text>

        <Text style={styles.text}>
          This is a placeholder. Add more questions and answers later.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#96B9E7' },

  header: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2973bc',
    textAlign: 'center',
    marginTop: 20,
  },

  inner: { padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#2973bc', marginBottom: 16 },

  text: { fontSize: 16, color: '#fff' },
});
