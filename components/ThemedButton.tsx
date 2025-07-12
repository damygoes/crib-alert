import { useThemeColor } from '@/hooks/useThemeColor';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ThemedButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function ThemedButton({ children, style, ...props }: ThemedButtonProps) {
  const backgroundColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'card');

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      {...props}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});
