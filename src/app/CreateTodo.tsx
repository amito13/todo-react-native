import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const createTodo = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.29.177:8000/todo/createTodos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        Alert.alert("Success", data.message);

        setTitle("");
        setDescription("");
      } else {
        Alert.alert("Error", data.message || "Failed to create todo");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Todo</Text>

      <TextInput
        placeholder="Todo title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Todo description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.description]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createTodo}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Todo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  description: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});