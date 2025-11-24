// app/tabs/profile.tsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, View } from 'react-native';
import { router } from 'expo-router';

export default function Profile() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inner}>
				<Text style={styles.title}>Profile</Text>
				<Text style={styles.fieldLabel}>Username</Text>
				<Text style={styles.fieldValue}>Guest</Text>

				<Pressable style={styles.button} onPress={() => router.push('/tabs/settings')}>
					<Text style={styles.buttonText}>Open Settings</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#96B9E7' },
	inner: { padding: 20 },
	title: { fontSize: 26, fontWeight: '700', color: '#2973bcff', marginBottom: 12 },
	fieldLabel: { color: '#fff', fontSize: 14, marginTop: 8 },
	fieldValue: { color: '#fff', fontSize: 18, fontWeight: '600' },
	button: { marginTop: 24, backgroundColor: '#6ca0dc', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
	buttonText: { color: '#fff', fontWeight: '700' },
});
