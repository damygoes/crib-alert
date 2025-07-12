import { COLORS } from '@/constants/Colors';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingState() {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="small" color={COLORS.light.primary} />
      <Text style={styles.loadingText}>Loading devices...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.light.text,
  },
});
