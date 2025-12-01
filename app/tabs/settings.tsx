// app/tabs/settings.tsx
import { router } from 'expo-router';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Balance+ Header → takes you back to Home */}
      <Pressable onPress={() => router.push("/tabs/home")}>
        <Text style={styles.header}>Balance+</Text>
      </Pressable>

      <View style={styles.inner}>
        <Text style={styles.title}>Settings</Text>

        {/* Sync health data */}
        <Pressable
          style={styles.item}
          onPress={() =>
            Alert.alert("Sync Health Data", "Syncing Google Fit / Apple Health (placeholder)")
          }
        >
          <Text style={styles.itemText}>Sync Google Fit / Apple Health</Text>
        </Pressable>

        {/* Change password */}
        <Pressable
          style={styles.item}
          onPress={() =>
            Alert.alert("Change Password", "Password change coming soon")
          }
        >
          <Text style={styles.itemText}>Change Password</Text>
        </Pressable>

        {/* Notifications */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/tabs/notifications")}
        >
          <Text style={styles.itemText}>Notifications</Text>
        </Pressable>

        {/* FAQs */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/tabs/faqs")}
        >
          <Text style={styles.itemText}>FAQs</Text>
        </Pressable>

        {/* Data */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/tabs/data")}
        >
          <Text style={styles.itemText}>Data & Privacy</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#96B9E7' },

  header: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2973bcff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  inner: { padding: 20 },

  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#2973bcff', 
    marginBottom: 12 
  },

  item: {
    backgroundColor: '#6ca0dc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
  },

  itemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
