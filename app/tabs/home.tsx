// app/tabs/home.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';

//local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import MoodModal from "../tabs/MoodModal";

const categories: { label: string }[] = [
  { label: "Mood" },
  { label: "Sleep"  },
  { label: "Energy"  },
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
  5: "#33da57ff"
};

const sleepColors: { [key: number]: string } = {
  1: "#e67175ff",
  2: "#de5386ff",
  3: "#b556a5ff",
  4: "#8252b5ff",
  5: "#736bd1ff"
};

const energyColors: { [key: number]: string } = {
  1: "#50addbff",
  2: "#53dec9ff",
  3: "#64d9b4ff",
  4: "#65da7fff",
  5: "#95e40eff"
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

const STORAGE_PREFIX = "dailyLog-";

const getDateKey = (date: Date) => {
  return STORAGE_PREFIX + date.toISOString().slice(0, 10);
};




export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const daysOfWeek = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday'
  ];

  const today = daysOfWeek[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState<string>(today);

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
  const [steps, setSteps] = useState<string>("");
  const [heartRate, setHeartRate] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  // nutrition
  const [hydration, setHydration] = useState<number>(0); // 0..10
  const healthinessOptions = ["Healthy", "Moderate", "Poor"];
  const [healthiness, setHealthiness] = useState<string | null>(null);

  // symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const symptomOptions = [ 
    "Fatigue", "Headache", "Nausea", "Back Pain", 
    "Anxiety", "Depression", "Cramps", "Dizziness",
    "Brain Fog", "Irritability", "Joint Pain", "Bloating",
    "Chest Pain", "Low Appetite", "High Appetite",
  ];

  // notes
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const loadToday = async () => {
      try {
        const key = getDateKey(new Date());
        const saved = await AsyncStorage.getItem(key);

        if (!saved) return;

        const log = JSON.parse(saved) as DailyLog;

        setMoodRating(log.moodRating ?? null);
        setMoodFeelings(log.moodFeelings ?? []);
        setSleepRating(log.sleepRating ?? null);
        setSleepHours(log.sleepHours ?? 7);
        setEnergyRating(log.energyRating ?? null);
        setSteps(log.steps ?? "0");
        setHeartRate(log.heartRate ?? "");
        setWeight(log.weight ?? "");
        setHydration(log.hydration ?? 4);
        setHealthiness(log.healthiness ?? null);
        setSelectedSymptoms(log.selectedSymptoms ?? []);
        setNotes(log.notes ?? "");
      } catch (err) {
        console.error("Error loading today's log", err);
      }
    };

    loadToday();
  }, []);

  // handleSaveLog function
  const handleSaveLog = async () => {
    try {
      const today = new Date();

      const log: DailyLog = {
        date: today.toISOString().slice(0, 10),
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

      const key = getDateKey(today);
      await AsyncStorage.setItem(key, JSON.stringify(log));

      Alert.alert("Saved!", "Your daily log has been stored for today.");
    } catch (err) {
      console.error("Error saving log", err);
      Alert.alert("Error", "Could not save your log. Try again.");
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
        : [...prev, symptom]
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

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <Pressable
          style={styles.menuOverlay}
          onPress={() => setMenuOpen(false)}
        >
          <View style={styles.menuContainer}>
            <Pressable onPress={() => { setMenuOpen(false); router.push("/tabs/profile"); }}>
              <Text style={styles.menuItem}>Account</Text>
            </Pressable>

            <Pressable onPress={() => { setMenuOpen(false); router.push("/tabs/settings"); }}>
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
        style={{ flex : 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.dateRow}>
            <Pressable onPress={() => router.push("/tabs/history")}>
              <Feather name="calendar" size={24} color="#2973bcff" />
            </Pressable>

            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>



          <Text style={styles.screenName}>Daily Log</Text>
        
          <View style={styles.stack}>
            {categories.map((item) => (
              <View key={item.label} style={styles.categoryCard}>
                <Pressable

                  onPress={() => toggleCategory(item.label)} style={styles.headerRowFix}
                >
                  <Text style={styles.categoryLabel}>{item.label}</Text>

                  {/* Wrap rating + icon together */}
                  <View style={styles.rightCluster}>
                    {item.label === "Mood" && moodRating !== null && (
                      <View
                        style={[
                          styles.selectedCircle,
                          { backgroundColor: moodColors[moodRating] }
                        ]}
                      >
                        <Text style={styles.selectedCircleText}>{moodRating}</Text>
                      </View>
                    )}
                    {item.label === "Sleep" && sleepRating !== null && (
                      <View
                        style={[
                          styles.selectedCircle,
                          { backgroundColor: sleepColors[sleepRating] }
                        ]}
                      >
                        <Text style={styles.selectedCircleText}>{sleepRating}</Text>
                      </View>
                    )}

                    {item.label === "Energy" && energyRating !== null && (
                      <View
                        style={[
                          styles.selectedCircle,
                          { backgroundColor: energyColors[energyRating] }
                        ]}
                      >
                        <Text style={styles.selectedCircleText}>{energyRating}</Text>
                      </View>
                    )}

                    <Feather
                      name={openCategories.includes(item.label) ? "minus" : "plus"}
                      size={22}
                      color="#fff"
                    />
                  </View>
                </Pressable>

                {/* Dropdown for mood */}
                {item.label === "Mood" && openCategories.includes("Mood") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>How is your mood?</Text>

                    <View style={styles.moodRow}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Pressable
                          key={value}
                          onPress={() => {
                            if (moodRating === value) {
                              setMoodRating(null);
                            } else {
                              setMoodRating(value);
                              setShowMoodModal(true);
                            }
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
                        <Text style={{ color: "#2973bcff", fontWeight: "600", marginBottom: 6 }}>
                          Feelings:
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                          {moodFeelings.map((f) => (
                            <View key={f} style={{ backgroundColor: "#ffffff33", padding: 6, borderRadius: 10 }}>
                              <Text style={{ color: "#fff" }}>{f}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )}

                {/* Dropdown for sleep */}
                {item.label === "Sleep" && openCategories.includes("Sleep") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>How did you sleep?</Text>

                    <View style={styles.sleepRow}>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Pressable
                          key={rating}
                          style={[
                            styles.sleepButton,
                            { backgroundColor: sleepColors[rating]},
                            sleepRating === rating && styles.selectedRatingRing,
                          ]} 
                          onPress={() => {
                            if (sleepRating === rating) {
                              setSleepRating(null);
                            } else {
                              setSleepRating(rating);
                            }
                          }}
                        >
                          <Text style={styles.sleepLabel}>{rating}</Text>
                        </Pressable>
                      ))}
                    </View>

                    {/* SLEEP HOURS SELECTOR */}
                    <View style={{ marginTop: 20 }}>
                      <Text style={styles.dropdownText}>Hours slept:</Text>

                      <View style={styles.adjustRow}>
                        <Pressable
                          style={styles.adjustBtn}
                          onPress={() =>
                            setSleepHours((prev) => Math.max(0, +(prev - 0.5).toFixed(1)))
                          }
                        >
                          <Text style={styles.adjustLabel}>–</Text>
                        </Pressable>

                        <Text style={styles.adjustValue}>{sleepHours.toFixed(1)} hrs</Text>

                        <Pressable
                          style={styles.adjustBtn}
                          onPress={() =>
                            setSleepHours((prev) => Math.min(24, +(prev + 0.5).toFixed(1)))
                          }
                        >
                          <Text style={styles.adjustLabel}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}

                {/* Dropdown for energy */}
                {item.label === "Energy" && openCategories.includes("Energy") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>What is your energy level?</Text>

                    <View style={styles.sleepRow}>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Pressable
                          key={rating}
                          onPress={() => {
                            if (energyRating === rating) {
                              setEnergyRating(null);
                            } else {
                              setEnergyRating(rating);
                            }
                          }}
                          style={[
                            styles.sleepButton,
                            { backgroundColor: energyColors[rating]},
                            energyRating === rating && styles.selectedRatingRing,
                          ]} 
                        >
                          <Text style={styles.sleepLabel}>{rating}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

                {/* activity dropdown */}
                {item.label === "Activity" && openCategories.includes("Activity") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Steps</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={steps}
                      onChangeText={setSteps}
                      placeholder="0"
                      placeholderTextColor="#fff"
                    />

                    <Text style={[styles.dropdownText, { marginTop: 15 }]}> Resting Heart Rate (bpm)</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={heartRate}
                      onChangeText={setHeartRate}
                      placeholder="bpm"
                      placeholderTextColor="#fff"
                    />

                    <Text style={[styles.dropdownText, { marginTop: 15 }]}>Weight (lbs)</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={weight}
                      onChangeText={setWeight}
                      placeholder="lbs"
                      placeholderTextColor="#fff"
                    />
                  </View>
                )}

                {/* nutrition dropdown */}
                {item.label === "Nutrition" && openCategories.includes("Nutrition") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Hydration (glasses of water)</Text>

                    <View style={styles.adjustRow}>
                      <Pressable
                        style={styles.adjustBtn}
                        onPress={() => setHydration((prev) => Math.max(0, prev - 1))}
                      >
                        <Text style={styles.adjustLabel}>–</Text>
                      </Pressable>

                      <Text style={styles.adjustValue}>{hydration}</Text>

                      <Pressable
                        style={styles.adjustBtn}
                        onPress={() => setHydration((prev) => Math.min(10, prev + 1))}
                      >
                        <Text style={styles.adjustLabel}>+</Text>
                      </Pressable>
                    </View>

                    <Text style={[styles.dropdownText, { marginTop: 20 }]}>Meal Healthiness</Text>

                    <View style={styles.healthinessRow}>
                      {healthinessOptions.map((opt) => (
                        <Pressable
                          key={opt}
                          onPress={() => {
                            if (healthiness === opt) {
                              setHealthiness(null);
                            } else {
                              setHealthiness(opt);
                            }
                          }}
                          style={[
                            styles.healthBtn,
                            healthiness === opt && styles.healthBtnSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.healthBtnLabel,
                              healthiness === opt && styles.healthBtnLabelSelected,
                            ]}
                          >
                            {opt}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

                {/* symptoms dropdown */}
                {item.label === "Symptoms" && openCategories.includes("Symptoms") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Select symptoms:</Text>

                    <View style={styles.symptomGrid}>
                      {symptomOptions.map((symptom) => (
                        <Pressable
                          key={symptom}
                          onPress={() => toggleSymptom(symptom)}
                          style={[
                            styles.symptomButton,
                            selectedSymptoms.includes(symptom) && styles.symptomSelected,
                          ]}
                        >
                          <Text style={styles.symptomLabel}>{symptom}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

                {/* NOTES DROPDOWN */}
                {item.label === "Notes" && openCategories.includes("Notes") && (
                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Write a note:</Text>

                    <TextInput
                      style={styles.notesInput}
                      multiline
                      value={notes}
                      onChangeText={setNotes}
                      placeholder="Write your thoughts..."
                      placeholderTextColor="#fdfdfdff"
                      onFocus={() => {
                        // autoscroll
                        setTimeout(() => {
                          scrollRef.current?.scrollTo({
                            y: 2000,
                            animated: true,
                          });
                        }, 200);
                      }}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* SAVE LOG BUTTON */}
      <Pressable style={styles.saveButton} onPress={handleSaveLog}>
        <Text style={styles.saveButtonText}>Save Log</Text>
      </Pressable>

      <MoodModal
        visible={showMoodModal}
        onClose={() => setShowMoodModal(false)}
        onSave={(feelings) => {
          setMoodFeelings(feelings);
          setShowMoodModal(false);
        }}
      />

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
  container: {
    flex: 1,
    backgroundColor: '#96B9E7',
  },
  scroll: {
    paddingBottom: 150,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2973bcff',
    marginTop: 10,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.05)", // subtle dim
    zIndex: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 60,
    right: 10,
    width: 200, // thinner
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    zIndex: 11,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  screenName: {
    fontSize: 26,
    paddingLeft: 20,
    fontWeight: "800",
    color: '#f4f6f9ff',
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 15,
    gap: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#2973bcff',
  },
  stack: {
    width: '100%',
    flexDirection: 'column',
  },
  categoryCard: {
    backgroundColor: "#ffffff22",
    borderRadius: 18,
    padding: 25,
    marginBottom: 14,
    marginLeft: 15,
    marginRight: 15,
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
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    marginBottom: 12,
    color: "#2973bcff",
    fontWeight: 'bold',
  },
  /* mood */
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  moodLabel: {
    color: "#f2ececff",
    fontWeight: "700",
  },
  /* sleep & energy */
  sleepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sleepButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sleepLabel: {
    color: "#ffffffff",
    fontWeight: "700",
  },
  /* Activity */
  input: {
    backgroundColor: "#ffffff55",
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  /* Nutrition */
  healthinessRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  healthBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff33",
    borderRadius: 12,
  },
  healthBtnSelected: {
    backgroundColor: "#ffffffaa",
  },
  healthBtnLabel: {
    color: "#2973bcff",
    fontSize: 15,
    fontWeight: "600"
  },
  healthBtnLabelSelected: {
    color: "#2973bcff",
    fontWeight: "600",
  },
  /* Symptoms */ 
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
    color: "#2973bcff" 
  }, 
  symptomLabel: { 
    color: "#2973bcff", 
    fontWeight: "600" 
  }, 
  /* Notes */ 
  notesInput: { 
    backgroundColor: "#ffffff22", 
    color: "#fff", 
    padding: 12, 
    borderRadius: 12, 
    minHeight: 180,
    fontSize: 15,
    fontWeight: "600" 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#96B9E7',
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 25,
    borderTopWidth: 2,
    borderTopColor: "#6ca0dc",
    marginBottom: 0,
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
  // new button for saving data
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
  headerRowFix: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
},

rightCluster: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 10,
  minWidth: 90, // prevents wrapping
},
});