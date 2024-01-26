import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Subject({ subject, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <Text style={styles.title}>{subject.subject}</Text>
        <Text>Instructor: {subject.teacher}</Text>
        <Text>
          Time: {subject.start} - {subject.finish}
        </Text>
        <Text>Location: {subject.room}</Text>
      </View>
      <Button title="" onPress={onDelete}>
        <MaterialCommunityIcons name="delete" size={30} color="black" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderColor: "gray",
    borderWidth: 1,
  },
  subjectContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Subject;
