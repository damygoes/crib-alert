import { supabase } from "@/services/supabase";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/Colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    console.log("🔐 Logging in...");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error("Login error:", error.message);
        setError(error.message);
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.card}>
          <View style={styles.headerIcon}>
            <Feather name="smile" size={32} color={COLORS.light.primary} />
          </View>
          <Text style={styles.title}>Crib Alert</Text>
          <Text style={styles.subtitle}>
            Sign in to monitor your baby&apos;s sleep
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.light.muted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor={COLORS.light.muted}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.8 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.light.white} />
            ) : (
              <>
                <Feather
                  name="log-in"
                  size={16}
                  color={COLORS.light.white}
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Secure Login</Text>
              </>
            )}
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.signUpText}>
              Don’t have an account?{" "}
              <Text style={{ color: COLORS.light.primary, fontWeight: "600" }}>
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.light.card,
    borderRadius: 12,
    padding: 24,
    shadowColor: COLORS.light.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  headerIcon: {
    alignSelf: "center",
    backgroundColor: `${COLORS.light.primary}20`,
    padding: 16,
    borderRadius: 9999,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.light.muted,
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: COLORS.light.text,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.text,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: COLORS.light.white,
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: COLORS.light.danger ?? "red",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  signUpText: {
    fontSize: 14,
    color: COLORS.light.text,
    textAlign: "center",
  },
});