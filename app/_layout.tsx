import { RootLayoutContent } from '@/components/layouts/layout';
import { SupabaseAuthProvider } from '@/services/SupabaseAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SupabaseAuthProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutContent />
      </QueryClientProvider>
    </SupabaseAuthProvider>
  );
}
