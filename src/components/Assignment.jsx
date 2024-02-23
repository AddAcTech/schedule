import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Assignment({ assignment, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subject}>{assignment.subject}</Text>
      <Text style={styles.date}>{assignment.date}</Text>
      <Text>Description: {assignment.description}</Text>
      <Text
        style={
          assignment.done
            ? { color: "green", fontWeight: "bold" }
            : { color: "red", fontWeight: "bold" }
        }
      >
        {assignment.done ? "Done" : "Pending"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    gap: 5,
  },
  subject: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 15,
  },
});
