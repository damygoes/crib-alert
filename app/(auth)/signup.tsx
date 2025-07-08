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
  View
} from "react-native";

import { COLORS } from "@/constants/Colors";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
      if (session) {
        setSuccess("Account created successfully! Please check your email for verification.");
        setEmail("");
        setPassword("");
        setConfirm("");
        router.replace("/");
      }
      if (error) {
        console.error("Signup error:", error.message);
        setError(error.message);
        return;
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Unexpected error during signup:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.card}>
          <View style={styles.headerIcon}>
            <Feather name="user-plus" size={32} color={COLORS.light.primary} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to get started with Crib Alert
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              style={styles.input}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor={COLORS.light.muted}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.8 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.light.white} />
            ) : (
              <>
                <Feather
                  name="user-check"
                  size={16}
                  color={COLORS.light.white}
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Sign Up</Text>
              </>
            )}
          </TouchableOpacity>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : success ? (
            <Text style={styles.successText}>{success}</Text>
          ) : null}

          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={{ color: COLORS.light.primary, fontWeight: "600" }}>
                Log in
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
  },
  successText: {
    color: COLORS.light.success ?? "green",
    textAlign: "center",
    marginTop: 12,
  },
  loginText: {
    fontSize: 14,
    color: COLORS.light.text,
    textAlign: "center",
  },
});