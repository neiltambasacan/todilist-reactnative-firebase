import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

export default function ProfileScreen({ navigation }) {
  function logoutUser() {
    Swal.fire({
      title: "Log out",
      icon: "question",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut().then(() => {
          navigation.navigate("Login");
        });
      }
    });
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <Text style={styles.hello}>Hello</Text>
        <Text style={styles.name}>I’m {auth.currentUser?.email || "User"}</Text>
        <Text style={styles.role}>Freelance web Designer & Developer</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#ffc107" }]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.btnText}>HOME</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#ff5722" }]}
            onPress={() => navigation.navigate("Table")}
          >
            <Text style={styles.btnText}>TO-DO LIST</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#9e9e9e" }]}
            onPress={logoutUser}
          >
            <Text style={styles.btnText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.right}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/53/bf/64/53bf644121afb19a89eb1fb2379b6fef.jpg",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  left: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 30,
    justifyContent: "center",
    alignItems: "center", // ← Center everything horizontally
  },
  right: {
    flex: 1,
    backgroundColor: "#ffe358",
    alignItems: "center",
    justifyContent: "center",
  },
  hello: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  name: {
    fontSize: 28,
    color: "#ffc107",
    fontWeight: "bold",
    marginBottom: 10,
  },
  role: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 25,
    textAlign: "center",
  },
  buttons: {
    gap: 10,
    alignItems: "center", // ← Center buttons inside the container
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 140,
  },
  btnText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#fff",
  },
});
