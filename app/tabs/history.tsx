// app/tabs/history.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // first day of month (0–6)
  const firstDay = new Date(year, month, 1).getDay();

  // number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  const years = Array.from({ length: 20 }, (_, i) => year - 10 + i);

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

      {/* Month and year dropdowns */}
      <View style={styles.dropdownRow}>
        
        {/* MONTH DROPDOWN */}
        <Pressable
          style={styles.dropdownBox}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={styles.dropdownText}>{monthNames[month]}</Text>
          <Feather name="chevron-down" size={20} color="#fff" />
        </Pressable>

        {/* YEAR DROPDOWN */}
        <Pressable
          style={styles.dropdownBox}
          onPress={() => setShowYearPicker(true)}
        >
          <Text style={styles.dropdownText}>{year}</Text>
          <Feather name="chevron-down" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* MONTH PICKER MODAL */}
      <Modal transparent visible={showMonthPicker} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowMonthPicker(false)}
        >
          <View style={styles.modalBox}>
            <ScrollView>
              {monthNames.map((m, i) => (
                <Pressable
                  key={m}
                  style={styles.modalItem}
                  onPress={() => {
                    setCurrentDate(new Date(year, i, 1));
                    setShowMonthPicker(false);
                  }}
                >
                  <Text style={styles.modalText}>{m}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* YEAR PICKER MODAL */}
      <Modal transparent visible={showYearPicker} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowYearPicker(false)}
        >
          <View style={styles.modalBox}>
            <ScrollView>
              {years.map((yr) => (
                <Pressable
                  key={yr}
                  style={styles.modalItem}
                  onPress={() => {
                    setCurrentDate(new Date(yr, month, 1));
                    setShowYearPicker(false);
                  }}
                >
                  <Text style={styles.modalText}>{yr}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>


      {/* calendar wrapper */}
      <View style={styles.calendarWrapper}>

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
            const today =
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear();

            const isSelected = selectedDay === day;

            return (
              <Pressable
                key={day}
                style={[
                  styles.dayCell, 
                  today && styles.today,
                  isSelected && styles.selectedDay,
                ]}
                onPress={() => {
                  setSelectedDay(day);
                  router.push(`/tabs/daylog?day=${day}&month=${month+1}&year=${year}`);
                }}
              >
                <Text 
                  style={[
                    styles.dayText, 
                    today && styles.todayText,
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
    marginLeft: 20,
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
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },

  monthText: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "600",
  },

  /* NEW DROPDOWN ROW */
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
    marginBottom: 5,
  },

  dropdownBox: {
    flexDirection: "row",
    backgroundColor: "#ffffff33",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    gap: 10,
    minWidth: 130,
    justifyContent: "space-between",
  },

  dropdownText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "70%",
    maxHeight: "60%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
  },

  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  modalText: {
    fontSize: 18,
    color: "#2973bcff",
    textAlign: "center",
  },


  /* CALENDAR WRAPPER BOX */
  calendarWrapper: {
    backgroundColor: "#ffffff22",
    borderRadius: 16,
    padding: 15,
    paddingBottom: 25,
    borderWidth: 2,
    borderColor: "#ffffff55",
    marginTop: 20,
    marginHorizontal: 20,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
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
    borderRadius: 15,
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
    /* SELECTED DAY */
  selectedDay: {
    backgroundColor: "#ffffffaa",
  },

  selectedDayText: {
    color: "#2973bcff",
    fontWeight: "800",
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
    marginBottom: 10,
  },
});
