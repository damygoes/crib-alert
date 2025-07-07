import { COLORS } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof COLORS.light
) {
  const theme = useColorScheme() ?? 'light';
  return props[theme] ?? COLORS[theme][colorName];
}
