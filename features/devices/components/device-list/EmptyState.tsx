import { COLORS } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyState() {
  return (
    <View style={styles.centered}>
      <Text style={styles.emptyText}>
        No devices found. Add one to get started.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.light.muted,
    textAlign: 'center',
  },
});
