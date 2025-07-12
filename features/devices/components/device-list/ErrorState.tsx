import { COLORS } from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ErrorState({
  errorMessage,
}: {
  errorMessage: string | null;
}) {
  return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>
        Failed to load devices: {errorMessage}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.retryText}>Tap to retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  errorText: {
    color: COLORS.dark.danger,
    textAlign: 'center',
  },
  retryText: {
    color: COLORS.light.primary,
    marginTop: 6,
  },
});
