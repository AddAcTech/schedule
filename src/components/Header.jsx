import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="New Subject"
          onPress={() => navigation.navigate("SubjectForm")}
        />
        <MaterialCommunityIcons name="plus-circle" size={40} color="black" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Schedule"
          onPress={() => navigation.navigate("ScheduleForm")}
        />
        <MaterialCommunityIcons name="pencil" size={40} color="black" />
      </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
