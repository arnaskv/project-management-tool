import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';
import { Provider } from 'react-redux';
import { trpc } from '@/utils/trpc';
import CustomRouterProvider from '@/router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContextProvider';
import store from '@/features/store';

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
    <Provider store={store}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CustomRouterProvider />
          </ThemeProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </Provider>
  );
}

export default App;
