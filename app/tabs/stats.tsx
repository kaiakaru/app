// app/tabs/stats.tsx
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// COLOR MAPS
const moodColors: { [key: number]: string } = {
  1: "#d9534f",
  2: "#eb9011ff",
  3: "#edab30ff",
  4: "#e8c412ff",
  5: "#33da57ff",
};

const energyColors: { [key: number]: string } = {
  1: "#50addbff",
  2: "#53dec9ff",
  3: "#64d9b4ff",
  4: "#65da7fff",
  5: "#a7e242ff",
};

// LOCAL-TIME SAFE KEY BUILDER
function getLocalKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `dailyLog-${y}-${m}-${d}`;
}

// LOAD LAST 7 LOGS (LOCAL DATES)
async function loadLast7Logs() {
  const logs = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const key = getLocalKey(date);
    const json = await AsyncStorage.getItem(key);

    logs.push(json ? JSON.parse(json) : null);
  }

  return logs;
}

// WEEKDAY LABELS FOR LAST 7 DAYS
function getLast7DayLabels() {
  const labels = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const short = d.toLocaleDateString("en-US", { weekday: "short" });
    labels.push(short[0]); // "M", "T", "W"
  }

  return labels;
}

export default function StatsScreen() {
  const [last7Mood, setLast7Mood] = useState<number[]>([]);
  const [last7SleepHours, setLast7SleepHours] = useState<number[]>([]);
  const [last7Energy, setLast7Energy] = useState<number[]>([]);

  const dayLabels = getLast7DayLabels();

  useEffect(() => {
    async function load() {
      const logs = await loadLast7Logs();

      setLast7Mood(logs.map((l) => l?.moodRating ?? 0));
      setLast7SleepHours(logs.map((l) => l?.sleepHours ?? 0));
      setLast7Energy(logs.map((l) => l?.energyRating ?? 0));
    }

    load();
  }, []);

  const screenWidth = Dimensions.get("window").width - 40;

  const maxMood = 5;
  const maxEnergy = 5;
  const chartHeight = 200;

  const isHome = false;
  const isStats = true;
  const isHistory = false;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.appName}>Balance+</Text>
        <Pressable onPress={() => router.push("/tabs/profile")}>
          <Feather name="user" size={28} color="#2973bcff" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.title}>Your Statistics</Text>

        {/* MOOD BAR CHART */}
        <Text style={styles.chartTitle}>Mood (last 7 days)</Text>
        <View style={styles.barContainer}>
          {last7Mood.map((value, idx) => (
            <View key={idx} style={styles.barWrapper}>
              <View
                style={{
                  height: (value / maxMood) * chartHeight,
                  width: 30,
                  backgroundColor: value ? moodColors[value] : "#ffffff55",
                  borderRadius: 6,
                }}
              />
              <Text style={styles.barLabel}>{dayLabels[idx]}</Text>
            </View>
          ))}
        </View>

        {/* SLEEP BAR CHART */}
        <Text style={styles.chartTitle}>Sleep Hours</Text>
        <View style={styles.barContainer}>
          {last7SleepHours.map((value, idx) => (
            <View key={idx} style={styles.barWrapper}>
              <View
                style={{
                  height: (value / 10) * chartHeight,
                  width: 30,
                  backgroundColor: value ? "#ffffffaa" : "#ffffff33",
                  borderRadius: 6,
                }}
              />
              <Text style={styles.barLabel}>{dayLabels[idx]}</Text>
            </View>
          ))}
        </View>

        {/* ENERGY BAR CHART */}
        <Text style={styles.chartTitle}>Energy Levels</Text>
        <View style={styles.barContainer}>
          {last7Energy.map((value, idx) => (
            <View key={idx} style={styles.barWrapper}>
              <View
                style={{
                  height: (value / maxEnergy) * chartHeight,
                  width: 30,
                  backgroundColor: value ? energyColors[value] : "#ffffff55",
                  borderRadius: 6,
                }}
              />
              <Text style={styles.barLabel}>{dayLabels[idx]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/tabs/home")}>
          <Feather name="home" size={28} color={isHome ? "#fff" : "#2973bcff"} />
        </Pressable>

        <Pressable onPress={() => router.push("/tabs/stats")}>
          <Feather name="bar-chart-2" size={28} color={isStats ? "#fff" : "#2973bcff"} />
        </Pressable>

        <Pressable onPress={() => router.push("/tabs/history")}>
          <Feather name="calendar" size={28} color={isHistory ? "#fff" : "#2973bcff"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#96B9E7" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  appName: { fontSize: 28, fontWeight: "700", color: "#2973bcff" },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    alignItems: "flex-end",
    height: 220,
  },
  barWrapper: { alignItems: "center" },
  barLabel: { color: "#fff", marginTop: 4, fontWeight: "600" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#96B9E7",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 25,
    borderTopWidth: 2,
    borderTopColor: "#6ca0dc",
  },
});