// app/tabs/notifications.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

export default function Notifications() {
  const [enabled, setEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      {/* Balance+ Header */}
      <Pressable onPress={() => router.push("/tabs/home")}>
        <Text style={styles.header}>Balance+</Text>
      </Pressable>

      <View style={styles.inner}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Allow push notifications?</Text>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>

        <Text style={styles.note}>More options can be added later if needed.</Text>
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

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  label: { fontSize: 16, color: '#fff', marginRight: 12 },

  note: { fontSize: 14, color: '#fff' },
});
