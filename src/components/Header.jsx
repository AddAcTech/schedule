import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("SubjectForm")}
        style={styles.buttonContainer}
      >
        <Text style={styles.text}>Create Subject</Text>
        <MaterialCommunityIcons name="plus-circle" size={40} color="white" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("ScheduleForm")}
        style={styles.buttonContainer}
      >
        <Text style={styles.text}>Create Schedule</Text>
        <MaterialCommunityIcons name="pencil" size={40} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#2d3748",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
});

export default Header;
