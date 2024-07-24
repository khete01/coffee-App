import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};
type User = {
  email: string;
};
type LoginInput = {
  email: string;
  password: string;
};
type RegisterInput = {
  email: string;
  password: string;
  fullName: string;
};
type AuthContextType = {
  user: User | undefined;
  onLogin: (user: LoginInput) => void;
  onRegister: (user: RegisterInput) => void;
  onLogout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    checkUser();
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("index");
  //   } else {
  //     router.push("home");
  //   }
  // }, [user]);

  const onRegister = async (registerInput: RegisterInput) => {
    try {
      const response = await axios.post(
        "https://coffee-back-zbsc-test.vercel.app/api/user",
        {
          email: registerInput.email,
          password: registerInput.password,
          fullName: registerInput.fullName,
        }
      );
      console.log("Registration successful:", response.data);
      router.push("login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "err registration:",
          error.response?.data || error.message
        );
      } else {
        console.error("err registration:", error);
      }
    }
  };

  const onLogin = async (loginInput: LoginInput) => {
    try {
      setUser({ email: loginInput.email });
      await AsyncStorage.setItem("@user", JSON.stringify(loginInput));
      router.push("home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("err login:", error.response?.data || error.message);
      } else {
        console.error("err login:", error);
      }
    }
  };

  // const onLogin = async (loginInput: LoginInput) => {
  //   if (email === "" || password === "") {
  //     //setRequired("Please enter all inputs");
  //   } else {
  //     const response = await axios.post(
  //       "https://coffee-back-zbsc-test.vercel.app/api/user",
  //       {
  //         email: registerInput.email,
  //         password: registerInput.password,
  //         fullName: registerInput.fullName,
  //       }
  //     );
  //   }
  // };

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(undefined);
      navigation.navigate("index");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("err logout:", error.response?.data || error.message);
      } else {
        console.error("err logout:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ onLogout, user, setUser, onLogin, onRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return React.useContext(AuthContext);
};
