// app/tabs/faqs.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Balance+?",
      answer:
        "Balance+ is a wellness tracking app that helps you log your mood, sleep, energy, symptoms, and more—all in one place.",
    },
    {
      question: "How do I log my daily mood?",
      answer:
        "Go to Home → Daily Log → Mood and select a rating from 1–5 to record how you're feeling.",
    },
    {
      question: "Can I edit previous entries?",
      answer:
        "Yes. Navigate to the History tab and tap any past day to modify your logged data.",
    },
    {
      question: "How do I change my account information?",
      answer:
        "Go to the Profile screen to update your name, email, and account preferences.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes. All data is stored securely, and only you can access your logs unless you manually share them.",
    },
    {
      question: "Does Balance+ sync with Apple Health or Google Fit?",
      answer:
        "Syncing support is planned for a future release. Stay tuned for updates!",
    },
    {
      question: "Who can see my stats?",
      answer:
        "Only you. Social and sharing features are optional and turned off by default.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Balance+ Header */}
      <Pressable onPress={() => router.push("/tabs/home")}>
        <Text style={styles.header}>Balance+</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>FAQs</Text>

        {faqs.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* Question Row */}
            <Pressable style={styles.row} onPress={() => toggle(index)}>
              <Text style={styles.question}>{item.question}</Text>
              <Feather
                name={openIndex === index ? "chevron-up" : "chevron-down"}
                size={22}
                color="#2973bc"
              />
            </Pressable>

            {/* Answer */}
            {openIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#96B9E7" },

  header: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2973bc",
    textAlign: "center",
    marginTop: 20,
  },

  inner: { padding: 20, paddingBottom: 40 },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2973bc",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#ffffffee",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2973bc",
    flex: 1,
    paddingRight: 10,
  },

  answer: {
    marginTop: 10,
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
  },
});
