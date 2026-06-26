import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  
} from "react-native";

interface Todo {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const Todos = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(
        "https://todo-mobile-588k.onrender.com/todo/todos"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();

      setTodoItems(data.todo);
    } catch (err) {
      console.log(err);
      setError("Unable to fetch todos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);
useEffect(() => {
  fetchTodos();
}, [fetchTodos]);
 

  const onRefresh = () => {
    setRefreshing(true);
    fetchTodos();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading Todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

 return (
  <FlatList
    data={todoItems}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.content}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    )}
  />
);
};

export default Todos;

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  description: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },

  date: {
    marginTop: 12,
    color: "#999",
    fontSize: 12,
  },
});