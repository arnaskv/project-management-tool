import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, trpc } from '@/utils/trpc';
import CustomRouterProvider from '@/router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContextProvider';
import { useAppSelector } from './features/hooks';

function App() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { theme } = useThemeContext();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient, setTrpcClient] = useState(() => createTRPCClient(accessToken));

  useEffect(() => {
    const newTrpcClient = createTRPCClient(accessToken);
    setTrpcClient(newTrpcClient);
  }, [accessToken]);

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
