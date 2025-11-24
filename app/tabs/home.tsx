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
  5: "#5cb85c"
};

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
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  const submitMood = (value: number) => {
    setMoodRating(value);
    setOpenCategory(null);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.appName}>Balance+</Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Pressable onPress={() => router.push("/tabs/profile")}>
            <Feather name="user" size={28} color="#2973bcff" />
          </Pressable>

          <Pressable onPress={() => setMenuOpen(!menuOpen)}>
            <Feather name="menu" size={30} color="#2973bcff" />
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
      <ScrollView contentContainerStyle={styles.scroll}>
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
                  name={openCategory === item.label ? "minus" : "plus"}
                  size={22}
                  color="#fff"
                />
              </Pressable>

              {item.label === "Mood" && openCategory === "Mood" && (
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>How is your mood?</Text>

                  <View style={styles.moodRow}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Pressable
                        key={value}
                        onPress={() => submitMood(value)}
                        style={[
                          styles.moodButton,
                          { backgroundColor: moodColors[value] }
                        ]}                      
                      >
                        <Text style={styles.moodLabel}>{value}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}

          {moodRating && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>
                Mood logged: {moodRating} / 5
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* FOOTER */}
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
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
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
    color: "#fff",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  moodLabel: {
    color: "#000",
    fontWeight: "700",
  },
  resultBox: {
    backgroundColor: "#ffffff44",
    padding: 15,
    alignSelf: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  resultText: {
    color: "#fff",
    fontWeight: "600",
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
