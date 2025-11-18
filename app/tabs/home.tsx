// app/tabs/home.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


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
  2: "#f0ad4e",
  3: "#ffd27f",
  4: "#f7e06e",
  5: "#65da7fff"
};

const sleepColors: { [key: number]: string } = {
  1: "#e67175ff",
  2: "#de5386ff",
  3: "#b556a5ff",
  4: "#8252b5ff",
  5: "#736bd1ff"
}

const energyColors: { [key: number]: string } = {
  1: "#50addbff",
  2: "#53dec9ff",
  3: "#64d9b4ff",
  4: "#65da7fff",
  5: "#bee57bff"
}

export default function HomeScreen() {
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

  // collected data for logs
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [sleepRating, setSleepRating] = useState<number | null>(null);
  const [energyRating, setEnergyRating] = useState<number | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const symptomOptions = [
    "Fatigue", 
    "Headache", 
    "Nausea", 
    "Back Pain", 
    "Anxiety", 
    "Depression",
  ]

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
  }


  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.appName}>Balance+</Text>
      {/* main scrollable content */}
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        

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

        {/* Day Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayRow}
        >
          {daysOfWeek.map((day) => (
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

        {/* DAILY LOG */}
        <Text style={styles.screenName}>Daily Log</Text>
        
        <View style={styles.stack}>
          {categories.map((item) => (
            <View key={item.label}>
              <Pressable
                style={styles.strip}
                onPress={() => toggleCategory(item.label)}
              >
                <Text style={styles.stripText}>{item.label}</Text>

                <Feather
                  name={openCategories.includes(item.label) ? "minus" : "plus"}
                  size={22}
                  color="#fff"
                />
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
                          setMoodRating(value);
                        }}
                        style={[styles.moodButton, { backgroundColor: moodColors[value] }]}                      
                      >
                        <Text style={styles.moodLabel}>{value}</Text>
                      </Pressable>
                    ))}
                  </View>
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
                        style={[styles.sleepButton,
                          { backgroundColor: sleepColors[rating]}
                        ]} 
                        onPress={() => {
                          setSleepRating(rating);
                        }}
                      >
                        <Text style={styles.sleepLabel}>{rating}</Text>
                      </Pressable>
                    ))}
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
                        style={[styles.sleepButton,
                          { backgroundColor: energyColors[rating]}
                        ]} 
                        onPress={() => {
                          setEnergyRating(rating);
                        }}
                      >
                        <Text style={styles.sleepLabel}>{rating}</Text>
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
                    placeholderTextColor="#545353ff"
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>


      {/* FOOTER NAV */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/tabs/home")}>
          <Feather name="home" size={28} color="#fff" />
        </Pressable>

        <Pressable onPress={() => router.push("/tabs/stats")}>
          <Feather name="bar-chart-2" size={28} color="#fff" />
        </Pressable>

        <Pressable onPress={() => router.push("/tabs/history")}>
          <Feather name="calendar" size={28} color="#fff" />
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
    paddingBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2973bcff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  screenName: {
    fontSize: 26,
    paddingLeft: 20,
    fontWeight: 800,
    color: '#f4f6f9ff'
  },
    dateRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
    gap: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#2973bcff',
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
    paddingVertical: 30,
    paddingHorizontal: 20, 
    borderBottomWidth: 1,
    borderBottomColor: '#6ca0dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stripText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4f6f9ff',
  },
  dropdown: {
    padding: 15,
    backgroundColor: "#96B9E7",
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
    color: "#000000ff",
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
    color: "#000000ff",
    fontWeight: "700",
  },

  /* Symptoms */ 
  symptomGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", gap: 10, 
  }, 
  symptomButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    backgroundColor: "#ffffff55", 
    borderRadius: 10, 
  }, 
  symptomSelected: { 
    backgroundColor: "#ffffffaa" 
  }, 
  symptomLabel: { 
    color: "#fff", 
    fontWeight: "600" 
  }, 
  
  /* Notes */ 
  notesInput: { 
    backgroundColor: "#ffffff22", 
    color: "#fff", 
    padding: 12, 
    borderRadius: 12, 
    minHeight: 80, 
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
