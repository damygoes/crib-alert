import { COLORS } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View, ViewProps } from 'react-native';

export function ThemedCard({ style, ...props }: ViewProps) {
  const backgroundColor = useThemeColor({}, 'card');

  return <View style={[{ backgroundColor }, styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: COLORS.dark.black,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 16
  },
});