import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import Swal from "sweetalert2";

export default function TableScreen() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  async function addItem() {
    if (!itemName.trim()) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Task name cannot be empty",
      });
      return;
    }

    setAdding(true);
    try {
      const newItem = {
        name: itemName,
        description: itemDesc,
      };

      const docRef = await addDoc(collection(db, "items"), newItem);
      setItems((prevItems) => [...prevItems, { id: docRef.id, ...newItem }]);
      setItemName("");
      setItemDesc("");
      setInputVisible(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setAdding(false);
    }
  }

  async function fetchItems() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.gradientBackground}>
      <View style={styles.card}>
        <Text style={styles.dateLabel}>{new Date().toDateString()}</Text>
        <Text style={styles.title}>To-do List</Text>

        {inputVisible && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              value={itemName}
              onChangeText={setItemName}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={itemDesc}
              onChangeText={setItemDesc}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.addBtn} onPress={addItem}>
              <Text style={styles.addBtnText}>Add Task</Text>
            </TouchableOpacity>
          </>
        )}

        {(adding || loading) && (
          <ActivityIndicator size="large" color="#6C63FF" style={styles.loader} />
        )}

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View style={styles.bullet} />
              <View>
                <Text style={styles.taskText}>{item.name}</Text>
                <Text style={styles.descText}>– {item.description}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            loading ? (
              <Text style={styles.emptyMessage}>Loading...</Text>
            ) : (
              <Text style={styles.emptyMessage}>No tasks yet.</Text>
            )
          }
          contentContainerStyle={items.length === 0 && styles.emptyContainer}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setInputVisible((prev) => !prev)}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: "linear-gradient(45deg, #c471f5, #fa71cd)", // use expo-linear-gradient if needed
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dateLabel: {
    textAlign: "center",
    color: "#6C63FF",
    marginBottom: 10,
    fontStyle: "italic",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 15,
    color: "#333",
  },
  addBtn: {
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  loader: {
    marginVertical: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  bullet: {
    width: 8,
    height: 8,
    backgroundColor: "#6C63FF",
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  descText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#A9A9A9",
    textAlign: "center",
    marginTop: 30,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#6C63FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
