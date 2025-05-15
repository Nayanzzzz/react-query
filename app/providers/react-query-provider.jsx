'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useState } from 'react';

export function ReactQueryProvider({ children }) {
  const [client] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          cacheTime: 1000 * 60 * 60, // 1 hour
        },
      },
    });

    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient: qc,
      persister: localStoragePersister,
    });

    return qc;
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
