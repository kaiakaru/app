// app/tabs/data.tsx
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Data() {
  const deletePast = () => {
    Alert.alert("Delete Past Data", "This will delete historical app data (placeholder).");
  };

  const deleteAccount = () => {
    Alert.alert("Delete Account", "This will permanently delete the account (placeholder).");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Balance+ Header */}
      <Pressable onPress={() => router.push("/tabs/home")}>
        <Text style={styles.header}>Balance+</Text>
      </Pressable>

      <View style={styles.inner}>
        <Text style={styles.title}>Data & Privacy</Text>

        <Pressable style={styles.item} onPress={deletePast}>
          <Text style={styles.itemText}>Delete Past Data</Text>
        </Pressable>

        <Pressable style={[styles.item, styles.danger]} onPress={deleteAccount}>
          <Text style={[styles.itemText, styles.dangerText]}>Delete Account</Text>
        </Pressable>

        <Text style={styles.note}>These features will connect to backend functionality later.</Text>
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

  title: { fontSize: 26, fontWeight: '700', color: '#2973bc', marginBottom: 20 },

  item: {
    backgroundColor: '#6ca0dc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
  },

  itemText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  danger: { backgroundColor: '#c0392b' },
  dangerText: { color: '#fff' },

  note: { marginTop: 12, color: '#fff', fontSize: 14 },
});
