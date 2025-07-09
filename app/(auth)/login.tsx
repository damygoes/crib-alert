import React from "react";
import {
  ImageBackground, SafeAreaView,
  StyleSheet
} from "react-native";

import LoginForm from '@/components/auth/LoginForm';

export default function LoginScreen() {

  return (
    <ImageBackground
      source={require("@/assets/images/login-bg.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <LoginForm />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});