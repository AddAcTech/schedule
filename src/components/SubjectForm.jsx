import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import AllSubjects from "./AllSubjects";

function SubjectForm() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@subjects");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        setSubjects(["No se cargaron los datos"]);
      }
    };

    getData().then((response) => {
      if (response) {
        setSubjects(response);
      }
    });
  }, []);

  const handleSubmit = async () => {
    setSubjects([...subjects, subject]);
    try {
      const jsonValue = JSON.stringify([...subjects, subject]);
      await AsyncStorage.setItem("@subjects", jsonValue);
    } catch (e) {
      // Saving error
    }
    navigation.navigate("/");
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>New Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Algorithms"
          onChangeText={handleSubjectChange}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text>Create Subject</Text>
          </Pressable>
        </View>
        <AllSubjects />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 8,
    width: "100%",
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
});

export default SubjectForm;
