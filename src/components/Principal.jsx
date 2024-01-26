import React, { useEffect, useState } from "react";
import Subject from "./Subject";
import Header from "./Header";
import EmptySchedule from "./EmptySchedule";
import { View, Text, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Principal() {
  const [subjects, setSubjects] = useState([]);
  const [today, setToday] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [dia, setDia] = useState("");
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

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("schedule"));
    if (response) {
      setSubjects(response);
    }
  }, []);

  // Filtramos los subjects por el día de hoy
  useEffect(() => {
    setToday(subjects.filter((subject) => subject.day === dia));
  }, [subjects, dia]);

  const handleDelete = (subjectToDelete) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject !== subjectToDelete
    );
    setSubjects(updatedSubjects);
    localStorage.setItem("schedule", JSON.stringify(updatedSubjects));
  };

  if (today.length === 0 || !today) {
    return <EmptySchedule />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.scheduleContainer}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={40}
            color="black"
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Principal;
