import { RootLayoutContent } from '@/components/layouts/layout';
import { SupabaseAuthProvider } from '@/services/SupabaseAuthProvider';

export default function RootLayout() {
  return (
    <SupabaseAuthProvider>
      <RootLayoutContent />
    </SupabaseAuthProvider>
  );
}