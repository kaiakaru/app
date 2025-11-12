// app/tabs/home.tsx
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const categories = [
  { label: 'Mood', color: '#96B9E7' },
  { label: 'Sleep', color: '#96B9E7' },
  { label: 'Energy', color: '#96B9E7' },
  { label: 'Activity', color: '#96B9E7' },
  { label: 'Nutrition', color: '#96B9E7' },
  { label: 'Symptoms', color: '#96B9E7' },
  { label: 'Notes', color: '#96B9E7' },
];

export default function HomeScreen() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = daysOfWeek[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState(today);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={styles.appName}>Balance+</Text>
        <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
        </Text>

        {/* Day Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayRow}
        >
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <Pressable
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.daySelected,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day && styles.dayTextSelected,
                ]}
              >
                {day.slice(0, 3)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.stack}>
          {categories.map((item) => (
            <Pressable
              key={item.label}
              style={[styles.strip, { backgroundColor: item.color }]}
              onPress={() => console.log(`${item.label} pressed`)}
            >
              <Text style={styles.stripText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Daily Log</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96B9E7',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5b7fa3',
  },
  date: {
    fontSize: 16,
    color: '#6a7d91',
    marginBottom: 20,
  },
  dayRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#e3ecf2',
  },
  daySelected: {
    backgroundColor: '#6ca0dc',
  },
  dayText: {
    color: '#4a627a',
    fontWeight: '500',
  },
  dayTextSelected: {
    color: '#fff',
  },
  stack: {
    width: '100%',
    flexDirection: 'column',
  },
  strip: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  stripText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dae7f3ff',
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5b7fa3',
  },
});
