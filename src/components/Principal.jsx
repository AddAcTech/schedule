import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subject from "./Subject";
import Header from "./Header";
import EmptySchedule from "./EmptySchedule";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

function Principal() {
  const [subjects, setSubjects] = useState([]);
  const [today, setToday] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [dia, setDia] = useState("");
  const navigation = useNavigation();

  const [dias, setDias] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  useEffect(() => {
    setDia(dias[fecha.getDay() - 1]);
  }, [fecha]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@schedule");
          return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
          // Error reading value
        }
      };

      getData().then((response) => {
        if (response) {
          setSubjects(response);
        }
      });
    }, [])
  );

  // Filtramos los subjects por el día de hoy
  useEffect(() => {
    setToday(subjects.filter((subject) => subject.day === dia));
  }, [subjects, dia]);

  const handleDelete = (subjectToDelete) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject !== subjectToDelete
    );
    setSubjects(updatedSubjects);
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@schedule", jsonValue);
      } catch (error) {
        console.log(error);
      }
    };
    storeData(updatedSubjects);
  };

  const handleChange = (value) => {
    setDia(value);
  };

  if (today.length === 0 || !today) {
    return <EmptySchedule />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons name="calendar-clock" size={30} color="black" />
        <Text style={styles.title}>{dia} schedule</Text>
        <Picker
          onValueChange={(inputValue) => handleChange(inputValue)}
          style={styles.inputs}
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
      <ScrollView style={styles.subjects} showsVerticalScrollIndicator={false}>
        {today.map((subject, index) => (
          <Subject
            key={index}
            subject={subject}
            onDelete={() => handleDelete(subject)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjects: {
    width: "100%",
    paddingHorizontal: 15,
    gap: 15,
  },
  scheduleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  inputs: {
    height: 50,
    width: 150,
  },
});

export default Principal;
