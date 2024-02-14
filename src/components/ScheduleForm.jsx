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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Picker
          selectedValue={schedule.subject}
          onValueChange={(itemValue) => handleChange("subject", itemValue)}
          style={styles.inputs}
        >
          <Picker.Item label="Select Subject" value="" />
          {subjects.map((subject, index) => (
            <Picker.Item key={index} label={subject} value={subject} />
          ))}
        </Picker>
        <TextInput
          placeholder="Teacher"
          onChangeText={(text) => handleChange("teacher", text)}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Starts"
          onChangeText={(text) => handleChange("start", text)}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Finish"
          onChangeText={(text) => handleChange("finish", text)}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Room"
          onChangeText={(text) => handleChange("room", text)}
          style={styles.inputs}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text>Create</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  selectors: {
    height: 50,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    padding: 16,
    borderRadius: 5,
  },
});

export default ScheduleForm;
