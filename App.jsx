import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Principal from "./src/components/Principal";
import SubjectForm from "./src/components/SubjectForm";
import ScheduleForm from "./src/components/ScheduleForm";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/">
        <Stack.Screen name="/" component={Principal} />
        <Stack.Screen name="SubjectForm" component={SubjectForm} />
        <Stack.Screen name="ScheduleForm" component={ScheduleForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
