import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';
import { trpc } from '@/utils/trpc';
import CustomRouterProvider from '@/router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContextProvider';

function App() {
  const { theme } = useThemeContext();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/v1/trpc',
        }),
      ],
      transformer: SuperJSON,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CustomRouterProvider />
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
