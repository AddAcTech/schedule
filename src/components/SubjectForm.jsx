import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

function SubjectForm() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("subjects"));
    if (response) {
      setSubjects(response);
    }
  }, []);

  const handleSubmit = () => {
    setSubjects([...subjects, subject]);
    localStorage.setItem("subjects", JSON.stringify([...subjects, subject]));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Algorithms"
        onChangeText={handleSubjectChange}
      />
      <Button title="Create Subject" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default SubjectForm;
