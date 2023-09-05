import { FC, lazy } from "react";
import { RouterProvider as RouterProviderCore } from "@tanstack/react-router";
import { Env } from "#utils/env";
import { router } from "#src/App.route";
const TanStackRouterDevtools =
  Env("NODE_ENV") === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
export const RouterProvider: FC = () => {
  return (
    <>
      <TanStackRouterDevtools router={router} />
      <RouterProviderCore router={router} />
    </>
  );
};
