import React from "react";
import Header from "./Header";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EmptySchedule() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>No schedule yet</Text>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={100}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default EmptySchedule;
