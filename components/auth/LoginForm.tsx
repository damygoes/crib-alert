import { COLORS } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedCard } from '../ThemedCard';
import { useAuthActions } from './hooks/useAuthActions';
import { useDeepLinkSession } from './hooks/useDeepLinkingSession';

export default function LoginForm() {
  const { sendMagicLink } = useAuthActions();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useDeepLinkSession(); // ✅ Listens for magic link redirects

  const handleMagicLink = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await sendMagicLink(email);
      setMessage('Magic link sent! Check your email.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Unexpected error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.inner}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedCard>
        <View style={styles.headerIcon}>
          <Feather name="smile" size={28} color={COLORS.light.primary} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.introText}>Welcome to</Text>
          <Text style={styles.title}>Crib Alert</Text>
        </View>
        <Text style={styles.subtitle}>Enter your email to get started</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.light.muted}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.8 }]}
          onPress={handleMagicLink}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.light.white} />
          ) : (
            <>
              <Feather
                name="mail"
                size={16}
                color={COLORS.light.white}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Get Started</Text>
            </>
          )}
        </TouchableOpacity>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : message ? (
          <Text style={styles.successText}>{message}</Text>
        ) : null}
      </ThemedCard>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerIcon: {
    alignSelf: 'center',
    backgroundColor: `${COLORS.light.primary}20`,
    padding: 14,
    borderRadius: 9999,
    marginBottom: 16,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 4,
  },
  introText: {
    fontSize: 16,
    color: COLORS.light.muted,
    textAlign: 'center',
    marginBottom: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.light.text,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.light.muted,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.text,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.light.primary,
    paddingVertical: 16,
    borderRadius: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: COLORS.light.white,
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: COLORS.light.danger ?? COLORS.light.danger,
    textAlign: 'center',
    marginTop: 12,
  },
  successText: {
    color: COLORS.light.success ?? COLORS.light.success,
    textAlign: 'center',
    marginTop: 12,
  },
});
