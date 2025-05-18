import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Reminder</Text>
      <Text style={styles.subtitle}>
        Stay on track and never miss a task. Organize your life with ease.
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "#b19cd9" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>PROFILE</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "#ff7f7f" }]}
          onPress={() => navigation.navigate("Table")}  
        >
          <Text style={styles.buttonText}>TO-DO LIST</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f7f2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
