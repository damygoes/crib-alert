import { COLORS } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  ViewProps
} from 'react-native';

type ThemedCardProps = ViewProps & {
  onPress?: (event: GestureResponderEvent) => void;
};

export function ThemedCard({ style, onPress, ...props }: ThemedCardProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const sharedStyle = [{ backgroundColor }, styles.card, style];

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          ...sharedStyle,
          pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
        ]}
        onPress={onPress}
        {...props}
      />
    );
  }

  return <View style={sharedStyle} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 18,
    shadowColor: COLORS.dark.black,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
});
