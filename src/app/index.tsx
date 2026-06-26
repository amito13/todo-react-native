import { StyleSheet, View } from "react-native";
import Todos from "./todos";
import CreateTodo from "./CreateTodo";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
    <CreateTodo/>
    <View style={{ flex: 1 }}>
        <Todos  />
    </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});