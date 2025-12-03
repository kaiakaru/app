// app/tabs/daylog.tsx
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

type DailyLog = {
  date: string;
  moodRating: number | null;
  moodFeelings: string[];
  sleepRating: number | null;
  sleepHours: number;
  energyRating: number | null;
  steps: string;
  heartRate: string;
  weight: string;
  hydration: number;
  healthiness: string | null;
  selectedSymptoms: string[];
  notes: string;
};

const STORAGE_PREFIX = "dailyLog-";

const formatKey = (y: number, m: number, d: number) => {
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${STORAGE_PREFIX}${y}-${mm}-${dd}`;
};

export default function DayLogScreen() {
  const params = useLocalSearchParams();
  const day = Number(params.day);
  const month = Number(params.month);
  const year = Number(params.year);

  const [log, setLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const key = formatKey(year, month, day);
        const json = await AsyncStorage.getItem(key);
        if (json) setLog(JSON.parse(json));
        else setLog(null);
      } catch (err) {
        console.error("Error loading daily log:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [day, month, year]);

  const dateLabel = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Feather
          name="arrow-left"
          size={26}
          color="#fff"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Day Log</Text>
      </View>

      <Text style={styles.dateText}>{dateLabel}</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : !log ? (
        <View style={styles.center}>
          <Text style={styles.empty}>No data saved for this day.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Each section */}
          <Section title="Mood">
            <Text style={styles.value}>
              Rating: {log.moodRating ?? "-"} / 5
            </Text>
            {log.moodFeelings.length > 0 && (
              <TagRow items={log.moodFeelings} />
            )}
          </Section>

          <Section title="Sleep">
            <Text style={styles.value}>
              Quality: {log.sleepRating ?? "-"} / 5
            </Text>
            <Text style={styles.value}>Hours: {log.sleepHours}</Text>
          </Section>

          <Section title="Energy">
            <Text style={styles.value}>
              Level: {log.energyRating ?? "-"} / 5
            </Text>
          </Section>

          <Section title="Activity">
            <Text style={styles.value}>Steps: {log.steps || "-"}</Text>
            <Text style={styles.value}>Heart Rate: {log.heartRate || "-"}</Text>
            <Text style={styles.value}>Weight: {log.weight || "-"}</Text>
          </Section>

          <Section title="Nutrition">
            <Text style={styles.value}>
              Hydration: {log.hydration} glasses
            </Text>
            <Text style={styles.value}>
              Meal Healthiness: {log.healthiness || "-"}
            </Text>
          </Section>

          <Section title="Symptoms">
            {log.selectedSymptoms.length === 0 ? (
              <Text style={styles.value}>None</Text>
            ) : (
              <TagRow items={log.selectedSymptoms} />
            )}
          </Section>

          <Section title="Notes">
            <Text style={styles.value}>{log.notes || "No notes"}</Text>
          </Section>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function TagRow({ items }: { items: string[] }) {
  return (
    <View style={styles.tagRow}>
      {items.map((item) => (
        <View key={item} style={styles.tag}>
          <Text style={styles.tagText}>{item}</Text>
        </View>
      ))}
    </View>
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
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  dateText: {
    color: "#fff",
    marginBottom: 15,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    color: "#fff",
    fontSize: 16,
  },
  section: {
    backgroundColor: "#ffffff22",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ffffff55",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  value: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#ffffff44",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagText: {
    color: "#2973bcff",
    fontWeight: "700",
  },
});