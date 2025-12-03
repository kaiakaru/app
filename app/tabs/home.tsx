// app/tabs/home.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";

// local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import MoodModal from "./MoodModal";

const categories: { label: string }[] = [
  { label: "Mood" },
  { label: "Sleep" },
  { label: "Energy" },
  { label: "Activity" },
  { label: "Nutrition" },
  { label: "Symptoms" },
  { label: "Notes" },
];

const moodColors: { [key: number]: string } = {
  1: "#d9534f",
  2: "#eb9011ff",
  3: "#edab30ff",
  4: "#e8c412ff",
  5: "#33da57ff",
};

const sleepColors: { [key: number]: string } = {
  1: "#e67175ff",
  2: "#de5386ff",
  3: "#b556a5ff",
  4: "#8252b5ff",
  5: "#736bd1ff",
};

const energyColors: { [key: number]: string } = {
  1: "#50addbff",
  2: "#53dec9ff",
  3: "#64d9b4ff",
  4: "#65da7fff",
  5: "#a7e242ff",
};

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

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const todayLabel = daysOfWeek[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState<string>(todayLabel);

  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // collected data for logs
  // mood
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [moodFeelings, setMoodFeelings] = useState<string[]>([]);

  // sleep
  const [sleepRating, setSleepRating] = useState<number | null>(null);
  const [sleepHours, setSleepHours] = useState<number>(7); // default

  // energy
  const [energyRating, setEnergyRating] = useState<number | null>(null);

  // activity
  const [steps, setSteps] = useState<string>("0");
  const [heartRate, setHeartRate] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  // nutrition
  const [hydration, setHydration] = useState<number>(4); // 0–10-ish scale
  const healthinessOptions = ["Healthy", "Moderate", "Poor"];
  const [healthiness, setHealthiness] = useState<string | null>(null);

  // symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const symptomOptions = [
    "Fatigue",
    "Headache",
    "Nausea",
    "Back Pain",
    "Anxiety",
    "Depression",
    "Cramps",
    "Dizziness",
    "Brain Fog",
    "Irritability",
    "Joint Pain",
    "Bloating",
    "Chest Pain",
    "Low Appetite",
    "High Appetite",
  ];

  // notes
  const [notes, setNotes] = useState("");

  // ========== SAVE DAILY LOG (LOCAL STORAGE) ==========
  const handleSaveLog = async () => {
    try {
      const today = new Date();

      // LOCAL DATE KEY (fixes Dec 2 → Dec 3 issue)
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, "0");
      const d = String(today.getDate()).padStart(2, "0");
      const dateKey = `${y}-${m}-${d}`;

      const log: DailyLog = {
        date: dateKey,
        moodRating,
        moodFeelings,
        sleepRating,
        sleepHours,
        energyRating,
        steps,
        heartRate,
        weight,
        hydration,
        healthiness,
        selectedSymptoms,
        notes,
      };

      // this key format matches History & Stats: dailyLog-YYYY-MM-DD
      await AsyncStorage.setItem(`dailyLog-${dateKey}`, JSON.stringify(log));

      Alert.alert(
        "Saved!",
        "Your daily log has been stored for today. You can view it in the Stats or History tabs."
      );
    } catch (err) {
      console.error("Error saving daily log:", err);
      Alert.alert("Error", "Could not save your log.");
    }
  };

  const toggleCategory = (label: string) => {
    setOpenCategories((prev) =>
      prev.includes(label)
        ? prev.filter((c) => c !== label)
        : [...prev, label]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom] // << fixed typo here
    );
  };

  const isHome = true;
  const isStats = false;
  const isHistory = false;

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

      {/* DROPDOWN MENU (if you use it later) */}
      {menuOpen && (
        <Pressable
          style={styles.menuOverlay}
          onPress={() => setMenuOpen(false)}
        >
          <View style={styles.menuContainer}>
            <Pressable
              onPress={() => {
                setMenuOpen(false);
                router.push("/tabs/profile");
              }}
            >
              <Text style={styles.menuItem}>Account</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setMenuOpen(false);
                router.push("/tabs/settings");
              }}
            >
              <Text style={styles.menuItem}>Settings</Text>
            </Pressable>

            <Pressable onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItem}>Notifications</Text>
            </Pressable>

            <Pressable onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItem}>FAQs</Text>
            </Pressable>

            <Pressable onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItem}>Data</Text>
            </Pressable>
          </View>
        </Pressable>
      )}

      {/* MAIN CONTENT */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* DATE ROW */}
          <View style={styles.dateRow}>
            <View>
              <Text style={styles.todayText}>Today</Text>
              <Text style={styles.dateText}>{selectedDay}</Text>
            </View>

            <Pressable onPress={() => router.push("/tabs/history")}>
              <Text style={styles.historyLink}>View History</Text>
            </Pressable>
          </View>

          {/* CATEGORY CARDS */}
          {categories.map((item) => (
            <View key={item.label} style={styles.categoryCard}>
              <Pressable
                onPress={() => toggleCategory(item.label)}
                style={styles.categoryHeader}
              >
                <Text style={styles.categoryLabel}>{item.label}</Text>

                {/* small indicators for current values */}
                {item.label === "Mood" && moodRating && (
                  <View
                    style={[
                      styles.selectedCircle,
                      { backgroundColor: moodColors[moodRating] },
                    ]}
                  >
                    <Text style={styles.selectedCircleText}>{moodRating}</Text>
                  </View>
                )}

                {item.label === "Sleep" && sleepRating && (
                  <View
                    style={[
                      styles.selectedCircle,
                      { backgroundColor: sleepColors[sleepRating] },
                    ]}
                  >
                    <Text style={styles.selectedCircleText}>
                      {sleepRating}
                    </Text>
                  </View>
                )}

                {item.label === "Energy" && energyRating && (
                  <View
                    style={[
                      styles.selectedCircle,
                      { backgroundColor: energyColors[energyRating] },
                    ]}
                  >
                    <Text style={styles.selectedCircleText}>
                      {energyRating}
                    </Text>
                  </View>
                )}

                <Feather
                  name={
                    openCategories.includes(item.label) ? "minus" : "plus"
                  }
                  size={22}
                  color="#fff"
                />
              </Pressable>

              {/* MOOD DROPDOWN */}
              {item.label === "Mood" &&
                openCategories.includes("Mood") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>How is your mood?</Text>

                    <View style={styles.moodRow}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Pressable
                          key={value}
                          onPress={() => {
                            setMoodRating(value);
                            setShowMoodModal(true);
                          }}
                          style={[
                            styles.moodButton,
                            { backgroundColor: moodColors[value] },
                            moodRating === value && styles.selectedRatingRing,
                          ]}
                        >
                          <Text style={styles.moodLabel}>{value}</Text>
                        </Pressable>
                      ))}
                    </View>

                    {moodFeelings.length > 0 && (
                      <View style={{ marginTop: 12 }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "600",
                            marginBottom: 6,
                          }}
                        >
                          Feelings:
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                        >
                          {moodFeelings.map((f) => (
                            <View
                              key={f}
                              style={{
                                backgroundColor: "#ffffff33",
                                padding: 6,
                                borderRadius: 10,
                              }}
                            >
                              <Text style={{ color: "#fff" }}>{f}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )}

              {/* SLEEP DROPDOWN */}
              {item.label === "Sleep" &&
                openCategories.includes("Sleep") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>How did you sleep?</Text>

                    <View style={styles.sleepRow}>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Pressable
                          key={rating}
                          style={[
                            styles.sleepButton,
                            { backgroundColor: sleepColors[rating] },
                            sleepRating === rating && styles.selectedRatingRing,
                          ]}
                          onPress={() => setSleepRating(rating)}
                        >
                          <Text style={styles.sleepLabel}>{rating}</Text>
                        </Pressable>
                      ))}
                    </View>

                    {/* sleep hours selector */}
                    <View style={{ marginTop: 20 }}>
                      <Text style={styles.dropdownText}>Hours slept:</Text>

                      <View style={styles.adjustRow}>
                        <Pressable
                          style={styles.adjustBtn}
                          onPress={() =>
                            setSleepHours((prev) =>
                              Math.max(0, +(prev - 0.5).toFixed(1))
                            )
                          }
                        >
                          <Text style={styles.adjustLabel}>–</Text>
                        </Pressable>

                        <Text style={styles.adjustValue}>
                          {sleepHours.toFixed(1)} hrs
                        </Text>

                        <Pressable
                          style={styles.adjustBtn}
                          onPress={() =>
                            setSleepHours((prev) =>
                              Math.min(24, +(prev + 0.5).toFixed(1))
                            )
                          }
                        >
                          <Text style={styles.adjustLabel}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}

              {/* ENERGY DROPDOWN */}
              {item.label === "Energy" &&
                openCategories.includes("Energy") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>How is your energy?</Text>

                    <View style={styles.moodRow}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Pressable
                          key={value}
                          onPress={() => setEnergyRating(value)}
                          style={[
                            styles.moodButton,
                            { backgroundColor: energyColors[value] },
                            energyRating === value && styles.selectedRatingRing,
                          ]}
                        >
                          <Text style={styles.moodLabel}>{value}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

              {/* ACTIVITY DROPDOWN */}
              {item.label === "Activity" &&
                openCategories.includes("Activity") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Daily activity</Text>

                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Steps:</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={steps}
                        onChangeText={setSteps}
                        placeholder="e.g. 8000"
                        placeholderTextColor="#ffffff88"
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Heart Rate:</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={heartRate}
                        onChangeText={setHeartRate}
                        placeholder="e.g. 70 bpm"
                        placeholderTextColor="#ffffff88"
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Weight:</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="e.g. 150 lb"
                        placeholderTextColor="#ffffff88"
                      />
                    </View>
                  </View>
                )}

              {/* NUTRITION DROPDOWN */}
              {item.label === "Nutrition" &&
                openCategories.includes("Nutrition") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Hydration</Text>

                    <View style={styles.adjustRow}>
                      <Pressable
                        style={styles.adjustBtn}
                        onPress={() =>
                          setHydration((prev) => Math.max(0, prev - 1))
                        }
                      >
                        <Text style={styles.adjustLabel}>–</Text>
                      </Pressable>

                      <Text style={styles.adjustValue}>{hydration}</Text>

                      <Pressable
                        style={styles.adjustBtn}
                        onPress={() =>
                          setHydration((prev) => Math.min(10, prev + 1))
                        }
                      >
                        <Text style={styles.adjustLabel}>+</Text>
                      </Pressable>
                    </View>

                    <Text
                      style={[styles.dropdownText, { marginTop: 16, marginBottom: 8 }]}
                    >
                      Overall diet
                    </Text>

                    <View style={styles.healthRow}>
                      {healthinessOptions.map((option) => (
                        <Pressable
                          key={option}
                          onPress={() => setHealthiness(option)}
                          style={[
                            styles.healthBtn,
                            healthiness === option && styles.healthBtnSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.healthBtnLabel,
                              healthiness === option &&
                                styles.healthBtnLabelSelected,
                            ]}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

              {/* SYMPTOMS DROPDOWN */}
              {item.label === "Symptoms" &&
                openCategories.includes("Symptoms") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Symptoms</Text>

                    <View style={styles.symptomGrid}>
                      {symptomOptions.map((symptom) => (
                        <Pressable
                          key={symptom}
                          onPress={() => toggleSymptom(symptom)}
                          style={[
                            styles.symptomButton,
                            selectedSymptoms.includes(symptom) &&
                              styles.symptomSelected,
                          ]}
                        >
                          <Text style={styles.symptomLabel}>{symptom}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

              {/* NOTES DROPDOWN */}
              {item.label === "Notes" &&
                openCategories.includes("Notes") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Notes</Text>
                    <TextInput
                      style={styles.notesInput}
                      multiline
                      value={notes}
                      onChangeText={setNotes}
                      placeholder="Anything else you want to note..."
                      placeholderTextColor="#ffffff88"
                    />
                  </View>
                )}
            </View>
          ))}
        </ScrollView>

        {/* SAVE LOG BUTTON FLOATING ABOVE FOOTER */}
        <Pressable style={styles.saveButton} onPress={handleSaveLog}>
          <Text style={styles.saveButtonText}>Save Log</Text>
        </Pressable>
      </KeyboardAvoidingView>

      {/* FOOTER NAV */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/tabs/home")}>
          <Feather
            name="home"
            size={28}
            color={isHome ? "#ffffff" : "#2973bcff"}
          />
        </Pressable>

        <Pressable onPress={() => router.push("/tabs/stats")}>
          <Feather
            name="bar-chart-2"
            size={28}
            color={isStats ? "#ffffff" : "#2973bcff"}
          />
        </Pressable>

        <Pressable onPress={() => router.push("/tabs/history")}>
          <Feather
            name="calendar"
            size={28}
            color={isHistory ? "#ffffff" : "#2973bcff"}
          />
        </Pressable>
      </View>

      {/* MOOD FEELINGS MODAL */}
      <MoodModal
        visible={showMoodModal}
        onClose={() => setShowMoodModal(false)}
        onSave={(feelings) => {
          setMoodFeelings(feelings);
          setShowMoodModal(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96B9E7",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  appName: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "700",
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
    color: "#2973bcff",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 160, // extra space so Save button doesn't cover Notes
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  todayText: {
    color: "#ffffffaa",
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  historyLink: {
    color: "#ffffff",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  categoryCard: {
    backgroundColor: "#ffffff22",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  dropdown: {
    marginTop: 12,
  },
  dropdownText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  moodButton: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  moodLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  sleepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sleepButton: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  sleepLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    width: 100,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff33",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 15,
  },
  healthRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  healthBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff55",
  },
  healthBtnSelected: {
    backgroundColor: "#ffffffaa",
  },
  healthBtnLabel: {
    color: "#2973bcff",
    fontSize: 15,
    fontWeight: "600",
  },
  healthBtnLabelSelected: {
    color: "#2973bcff",
    fontWeight: "600",
  },
  symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  symptomButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff55",
    borderRadius: 10,
  },
  symptomSelected: {
    backgroundColor: "#ffffffaa",
  },
  symptomLabel: {
    color: "#2973bcff",
    fontWeight: "600",
  },
  notesInput: {
    backgroundColor: "#ffffff22",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    minHeight: 180,
    fontSize: 15,
    fontWeight: "600",
  },
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
  adjustRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 20,
  },
  adjustBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff55",
    justifyContent: "center",
    alignItems: "center",
  },
  adjustLabel: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  adjustValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  selectedCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#ffffff44",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedCircleText: {
    color: "#f6f2f2ff",
    fontWeight: "700",
  },
  selectedRatingRing: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  saveButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 90, // above footer
    backgroundColor: "#2973bcff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});