import { Env } from "#utils/env.util.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, lazy } from "react";
import { queryClient } from "#presentation/provider/query/client.ts";

const ReactQueryDevtools =
  Env("NXT_MODE") === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      );
export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position={"right"} />
    </QueryClientProvider>
  );
};
