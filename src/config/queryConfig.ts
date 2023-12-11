import { QueryClientConfig } from "@tanstack/react-query";

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
};
