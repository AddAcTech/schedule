import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  TextInput,
  Picker,
  StyleSheet,
} from "react-native";

function ScheduleForm() {
  const navigation = useNavigation();
  const [subjects, setSubjects] = useState([]);
  const [prevSchedule, setPrevSchedule] = useState([]);
  const [schedule, setSchedule] = useState({
    day: "",
    subject: "",
    teacher: "",
    start: "",
    finish: "",
    room: "",
  });

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("subjects"));
    const responseSchedule = JSON.parse(localStorage.getItem("schedule"));
    if (response) {
      setSubjects(response);
    }
    if (responseSchedule) {
      setPrevSchedule(responseSchedule);
    }
  }, []);

  const handleChange = (name, value) => {
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = () => {
    setPrevSchedule([...prevSchedule, schedule]);
    localStorage.setItem(
      "schedule",
      JSON.stringify([...prevSchedule, schedule])
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Schedule</Text>
      <View style={styles.inputGroup}>
        <Text>Day</Text>
        <Picker
          selectedValue={schedule.day}
          onValueChange={(itemValue) => handleChange("day", itemValue)}
        >
          <Picker.Item label="Select Day" value="" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
        </Picker>
      </View>
      {/* Repeat for other fields */}
      <Button title="Create" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
});

export default ScheduleForm;
