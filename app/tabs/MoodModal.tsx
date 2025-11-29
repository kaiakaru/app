import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";


type MoodModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (feelings: string[]) => void;
};

export default function MoodModal({ visible, onClose, onSave }: MoodModalProps) {
  const feelingsList = [
    "Happy", "Grateful", "Calm", "Excited",
    "Sad", "Irritated", "Confused", "Overwhelmed",
    "Bored", "Anxious", "Hopeful", "Content",
    "Angry", "Frustrated", "Lonely",
  ];

  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Feelings</Text>

            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          {/* FEELINGS LIST */}
          <ScrollView contentContainerStyle={styles.feelingsContainer}>
            {feelingsList.map((feeling) => (
              <Pressable
                key={feeling}
                onPress={() => toggleFeeling(feeling)}
                style={[
                  styles.feelingBtn,
                  selectedFeelings.includes(feeling) && styles.feelingSelected,
                ]}
              >
                <Text
                  style={[
                    styles.feelingLabel,
                    selectedFeelings.includes(feeling) && styles.feelingLabelSelected,
                  ]}
                >
                  {feeling}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* SAVE BUTTON */}
          <Pressable
            style={styles.saveButton}
            onPress={() => onSave(selectedFeelings)}
          >
            <Text style={styles.saveText}>Save</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "88%",
    backgroundColor: "#96B9E7",
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  feelingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 20,
  },
  feelingBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff33",
    borderRadius: 12,
  },
  feelingSelected: {
    backgroundColor: "#ffffffaa",
  },
  feelingLabel: {
    color: "#2973bcff",
    fontSize: 15,
    fontWeight: "600"
  },
  feelingLabelSelected: {
    color: "#2973bcff",
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#2973bcff",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
