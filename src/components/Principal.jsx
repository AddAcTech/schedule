import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subject from "./Subject";
import Header from "./Header";
import EmptySchedule from "./EmptySchedule";
import { View, Text, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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
  ]);

  useEffect(() => {
    setDia(dias[fecha.getDay() - 1]);
  }, [fecha]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@schedule");
          return jsonValue != null ? JSON.parse(jsonValue) : null;
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

  if (today.length === 0 || !today) {
    return <EmptySchedule />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons name="calendar-clock" size={50} color="black" />
        <Text style={styles.title}>{dia} schedule</Text>
      </View>
      {today.map((subject, index) => (
        <Subject
          key={index}
          subject={subject}
          onDelete={() => handleDelete(subject)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    margin: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Principal;
