import { QueryClient } from "@tanstack/react-query";
import { queryConfig } from "#config/queryConfig.ts";

export const queryClient = new QueryClient(queryConfig);
