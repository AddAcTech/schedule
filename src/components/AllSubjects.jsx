import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllSubjects() {
  const [subjects, setsubjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const local = await AsyncStorage.getItem("@subjects");
        const subjectsJson = JSON.parse(local);
        setsubjects(subjectsJson);
      } catch (e) {
        setsubjects(["No hay materias"]);
      }
    };
    getData();
  }, []);

  return (
    <View>
      <Header />
      {subjects.map((subject, index) => (
        <View key={index}>
          <Text>{subject}</Text>
          <MaterialCommunityIcons name="delete" size={30} color="black" />
        </View>
      ))}
    </View>
  );
}
