import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const QueryClientWrapper = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for testing
        gcTime: 0, // Disable caching (was cacheTime in older versions)
        staleTime: 0, // Consider data immediately stale
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
