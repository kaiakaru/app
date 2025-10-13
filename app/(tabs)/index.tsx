import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Mood = 'Happy' | 'Calm' | 'Tired' | 'Sad' | 'Angry' | null;

export default function App() {
  const [mood, setMood] = useState<Mood>(null);

  const handleSelectMood = (selected: Mood) => {
    setMood(selected);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mood Tracker</Text>

      <Text style={styles.prompt}>How are you feeling today?</Text>

      <View style={styles.moodContainer}>
        {['😊 Happy', '😌 Calm', '🥱 Tired', '😔 Sad', '😠 Angry'].map((label) => {
          const [emoji, name] = label.split(' ');
          return (
            <Pressable
              key={name}
              style={[
                styles.moodButton,
                mood === name && styles.selectedMoodButton,
              ]}
              onPress={() => handleSelectMood(name as Mood)}
            >
              <Text style={styles.moodText}>
                {emoji} {name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {mood && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>You’re feeling {mood.toLowerCase()} today 💭</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },
  prompt: {
    fontSize: 18,
    marginBottom: 20,
  },
  moodContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  moodButton: {
    backgroundColor: '#b9e1efff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  selectedMoodButton: {
    backgroundColor: '#90a3b4ff',
  },
  moodText: {
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 30,
  },
  resultText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
