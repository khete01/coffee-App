import { FirstView } from "@/components/subCompnonents/FirstView";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useRef } from "react";
import { router } from "expo-router";
import { SecondView } from "@/components/subCompnonents/SecondView";
import { ThirdView } from "@/components/subCompnonents/ThirdView";
import { FourthView } from "@/components/subCompnonents/FourthView";
import React from "react";

export default function HomeScreen() {
  const pagerViewRef = useRef<PagerView>(null);
  const loginHandler = () => {
    router.push("login");
  };
  const registerHandler = () => {
    router.push("register");
  };

  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0} ref={pagerViewRef}>
        <FirstView
          onStart={() => {
            pagerViewRef.current?.setPage(1);
          }}
        />
        <SecondView />
        <ThirdView />
        <FourthView onLogin={loginHandler} onRegister={registerHandler} />
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
