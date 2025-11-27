// app/tabs/history.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // first day of month (0–6)
  const firstDay = new Date(year, month, 1).getDay();

  // number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isHome = false;
  const isStats = false;
  const isHistory = true;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.push("/tabs/home")}>
          <Feather name="arrow-left" size={26} color="#ffffff" />
        </Pressable>

        <Text style={styles.title}>History</Text>
      </View>

      {/* Month selector */}
      <View style={styles.monthRow}>
        <Pressable onPress={prevMonth}>
          <Feather name="chevron-left" size={26} color="#ffffff" />
        </Pressable>

        <Text style={styles.monthText}>
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Text>

        <Pressable onPress={nextMonth}>
          <Feather name="chevron-right" size={26} color="#ffffff" />
        </Pressable>
      </View>

      {/* Calendar grid */}
      <View style={styles.weekRow}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <Text key={d} style={styles.weekLabel}>
            {d}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <View key={`empty-${idx}`} style={styles.dayCell} />
        ))}

        {/* Days */}
        {daysArray.map((day) => {
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          return (
            <Pressable
              key={day}
              style={[styles.dayCell, isToday && styles.today]}
              onPress={() => router.push(`/tabs/daylog?day=${day}&month=${month+1}&year=${year}`)}
            >
              <Text style={[styles.dayText, isToday && styles.todayText]}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      
    {/* FOOTER */}
        <View style={styles.footer}>
            <Pressable onPress={() => router.push("/tabs/home")}>
              <Feather name="home" size={28} color={isHome ? "#fff" : "#2973bcff" } />
            </Pressable>
      
            <Pressable onPress={() => router.push("/tabs/stats")}>
              <Feather name="bar-chart-2" size={28} color={isStats? "#fff" : "#2973bcff" } />
            </Pressable>
      
            <Pressable onPress={() => router.push("/tabs/history")}>
                <Feather name="calendar" size={28} color={isHistory? "#fff" : "#2973bcff" } />
            </Pressable>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96B9E7",
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
  },

  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  monthText: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "600",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  weekLabel: {
    color: "#ffffff",
    fontWeight: "600",
    width: "14.2%",
    textAlign: "center",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayCell: {
    width: "14.2%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 10,
  },

  dayText: {
    color: "#ffffff",
    fontSize: 16,
  },

  today: {
    backgroundColor: "#ffffff44",
  },

  todayText: {
    color: "#ffffff",
    fontWeight: "700",
  },
    footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#96B9E7',
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
    borderTopWidth: 2,
    borderTopColor: "#6ca0dc",
  },
});
