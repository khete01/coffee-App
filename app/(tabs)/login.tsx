import { useAuth } from "@/contexts/AuthProvider";
import React from "react";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useRouter } from "expo-router";
export default function LoginScreen() {
  const { onLogin } = useAuth();
  const [email, onChangeEmail] = useState<string | undefined>();
  const [password, onChangePassword] = useState<string | undefined>();
  const router = useRouter();
  const loginHandler = () => {
    // back end ruu huselt ilgeegeed zovshoorvol doorhi uildeliig  const { onLogin } = useAuth(); iig ajiluulna
    if (email && password)
      onLogin({
        email,
        password,
      });
  };
  const goToRegister = () => {
    router.push("register");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/login-bg.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.page}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="E-mail Address"
            placeholderTextColor={"#828282"}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            placeholder="Password"
            placeholderTextColor={"#828282"}
          />
          <Pressable>
            {/* <Text style={styles.forgotPass}>Forgot password?</Text> */}
            <Text style={styles.dontHave} onPress={goToRegister}>
              Don't have account?
            </Text>
          </Pressable>
          <Pressable onPress={loginHandler} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  image: {
    justifyContent: "center",
    position: "absolute",
    zIndex: -2,
    width: "100%",
    height: "100%",
  },
  input: {
    width: 350,
    height: 59,
    color: "white",
  },
  forgotPass: {
    color: "#CE9760",
    alignSelf: "flex-end",
  },
  button: {
    width: 242,
    height: 53,
    backgroundColor: "#CE9760",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 280,
    marginBottom: 84,
  },
  buttonText: {
    color: "#543A20",
    fontSize: 20,
    fontWeight: "bold",
  },
  dontHave: {
    color: "white",
    alignSelf: "flex-end",
    // marginTop:10
  },
});
