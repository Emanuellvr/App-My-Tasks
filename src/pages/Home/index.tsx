import React, { useContext, useState } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Tasklist } from "../../components/Tasklist";
import { useTaskList } from "../../context/TaskContext";

export const Home = () => {
  const [newTask, setNewTask] = useState("");

  const { addTask } = useTaskList();

  const handleAddNewTask = () => {
    const data = {
      id: String(new Date().getTime()),
      title: newTask ? newTask : "Task empty",
    };

    addTask(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome. Dev...!</Text>

        <TextInput
          onChangeText={setNewTask}
          style={styles.input}
          placeholderTextColor="#555"
          placeholder="Nova Tarefa..."
        />

        <TouchableOpacity
          testID="addButton"
          onPress={handleAddNewTask}
          activeOpacity={0.7}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <Text style={styles.titleTasks}>Minas Tarefas</Text>

        <Tasklist />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121214",
  },
  container: {
    flex: 1,
    backgroundColor: "#121214",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    color: "#f1f1f1",
    fontSize: 24,
    fontWeight: "bold",
  },
  titleTasks: {
    color: "#f1f1f1",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 50,
  },
  input: {
    backgroundColor: "#29292e",
    color: "#f1f1f1",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 12,
    marginTop: 30,
    borderRadius: 7,
  },
  button: {
    backgroundColor: "#eba417",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 7,
  },
  buttonText: {
    color: "#121214",
    fontSize: 18,
    fontWeight: "bold",
  },
});
