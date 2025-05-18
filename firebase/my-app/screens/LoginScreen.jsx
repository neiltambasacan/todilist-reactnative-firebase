import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Linking,
  Image,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../components/CustomButton";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter username and password");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        navigation.navigate("Home");
        console.log(userCredential.user.uid);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.log(error.code, error.message);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftPanel}>
        <Text style={styles.title}>Welcome back,</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text>Please wait...</Text>
          </View>
        ) : (
          <CustomButton title="SIGN IN" onPress={handleLogin} />
        )}
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>

        {/* Social login section */}
        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or sign in with</Text>
          <View style={styles.iconRow}>
            <Pressable
              style={styles.iconButton}
              onPress={() =>
                Linking.openURL("https://accounts.google.com/signin")
              }
            >
              <Image
                source={{ uri: "https://i.pinimg.com/736x/e8/f6/ee/e8f6eec580bfd2d1d7bd4c4d11a21c7e.jpg" }}
                style={styles.iconImage}
              />
            </Pressable>
            <Pressable
              style={styles.iconButton}
              onPress={() => Linking.openURL("https://www.facebook.com/login")}
            >
              <Image
                source={{ uri: "https://i.pinimg.com/736x/5b/b0/f7/5bb0f73a7b3e0f976acad614a42e5040.jpg" }}
                style={styles.iconImage}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.rightPanel}>
        <Text style={styles.newText}>New here?</Text>
        <Text style={styles.subText}>
          Sign up and discover great opportunities!
        </Text>
        <Pressable
          style={styles.signUpButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signUpText}>SIGN UP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: width > 600 ? "row" : "column",
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  leftPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#ffe358",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    maxWidth: 350,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: "#007bff",
  },
  loadingContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  newText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  subText: {
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  signUpText: {
    color: "#333",
    fontWeight: "bold",
  },
  socialContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  socialText: {
    marginBottom: 10,
    color: "#555",
  },
  iconRow: {
    flexDirection: "row",
    gap: 20,
  },
  iconButton: {
    padding: 8,
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
