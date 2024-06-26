import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '@server/shared/trpc';
import SuperJSON from 'superjson';
import { QueryClient } from '@tanstack/react-query';

export const trpc = createTRPCReact<AppRouter>();

export const createTRPCClient = (accessToken: string) => {
  return trpc.createClient({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: 'http://localhost:8080/v1/trpc',
        headers() {
          if (!accessToken) return {};
          return {
            Authorization: `Bearer ${accessToken}`,
          };
        },
      }),
    ],
  });
};

export const queryClient = new QueryClient();
