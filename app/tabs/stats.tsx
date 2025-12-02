import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
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

export default function StatsScreen() {
  const last7Mood = [1, 4, 2, 5, 4, 3, 4];
  const last7SleepHours = [7, 6.5, 8, 4, 6, 7, 8];
  const last7Energy = [1, 3, 4, 2, 3, 4, 5];

  const screenWidth = Dimensions.get("window").width - 40;

  const isHome = false;
  const isStats = true;
  const isHistory = false;

  const maxMood = 5;
  const maxEnergy = 5;
  const chartHeight = 200;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.appName}>Balance+</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Pressable onPress={() => router.push("/tabs/profile")}>
            <Feather name="user" size={28} color="#2973bcff" />
          </Pressable>
        </View>
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
                  backgroundColor: moodColors[value],
                  borderRadius: 6,
                }}
              />
              <Text style={styles.barLabel}>
                {["S", "M", "T", "W", "T", "F", "S"][idx]}
              </Text>
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
                  height: (value / 10) * chartHeight, // assuming 10h max
                  width: 30,
                  backgroundColor: "#ffffff99",
                  borderRadius: 6,
                }}
              />
              <Text style={styles.barLabel}>
                {["S", "M", "T", "W", "T", "F", "S"][idx]}
              </Text>
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
                  backgroundColor: energyColors[value],
                  borderRadius: 6,
                }}
              />
              <Text style={styles.barLabel}>
                {["S", "M", "T", "W", "T", "F", "S"][idx]}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/tabs/home")}>
          <Feather
            name="home"
            size={28}
            color={isHome ? "#fff" : "#2973bcff"}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/tabs/stats")}>
          <Feather
            name="bar-chart-2"
            size={28}
            color={isStats ? "#fff" : "#2973bcff"}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/tabs/history")}>
          <Feather
            name="calendar"
            size={28}
            color={isHistory ? "#fff" : "#2973bcff"}
          />
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

