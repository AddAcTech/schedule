import React, { useState, useEffect } from "react";
import { Pressable, Text, View, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";

function ScheduleForm() {
  const [subjects, setSubjects] = useState([]);
  const [prevSchedule, setPrevSchedule] = useState([]);
  const navigation = useNavigation();
  const [schedule, setSchedule] = useState({
    day: "",
    subject: "",
    teacher: "",
    start: "",
    finish: "",
    room: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const subjectsJson = await AsyncStorage.getItem("@subjects");
        const scheduleJson = await AsyncStorage.getItem("@schedule");
        return {
          subjects: subjectsJson != null ? JSON.parse(subjectsJson) : null,
          schedule: scheduleJson != null ? JSON.parse(scheduleJson) : null,
        };
      } catch (e) {
        // Error reading value
      }
    };

    getData().then((response) => {
      if (response.subjects) {
        setSubjects(response.subjects);
      }
      if (response.schedule) {
        setPrevSchedule(response.schedule);
      }
    });
  }, [subjects]);

  const handleChange = (name, value) => {
    console.log(name, value);
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async () => {
    setPrevSchedule([...prevSchedule, schedule]);
    try {
      await AsyncStorage.setItem(
        "@schedule",
        JSON.stringify([...prevSchedule, schedule])
      );
    } catch (e) {
      // Saving error
    }
    navigation.navigate("/");
  };

  return (
    <>
      <Header />
      <View
        style={{
          alignItems: "center",
          padding: 15,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>New Schedule</Text>
        <View style={styles.container}>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={schedule.day}
              onValueChange={(itemValue) => handleChange("day", itemValue)}
              style={styles.selectors}
            >
              <Picker.Item label="Select Day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={schedule.subject}
              onValueChange={(itemValue) => handleChange("subject", itemValue)}
              style={styles.selectors}
            >
              <Picker.Item label="Select Subject" value="" />
              {subjects.map((subject, index) => (
                <Picker.Item key={index} label={subject} value={subject} />
              ))}
            </Picker>
          </View>
        </View>
        <TextInput
          placeholder="Teacher"
          onChangeText={(text) => handleChange("teacher", text)}
          style={styles.inputs}
        />
        <View style={styles.container}>
          <TextInput
            placeholder="Starts"
            onChangeText={(text) => handleChange("start", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Finish"
            onChangeText={(text) => handleChange("finish", text)}
            style={styles.input}
          />
        </View>
        <TextInput
          placeholder="Room"
          onChangeText={(text) => handleChange("room", text)}
          style={styles.inputs}
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text>Create</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  input: {
    flex: 1,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  container: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
  selectorContainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    flex: 1,
  },
  selectors: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    width: "50%",
    marginLeft: 15,
    fontWeight: "bold",
  },
});

export default ScheduleForm;
