import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View, ViewProps } from 'react-native';

export function ThemedCard({ style, ...props }: ViewProps) {
  const backgroundColor = useThemeColor({}, 'card');

  return <View style={[{ backgroundColor }, styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 16
  },
});