import { Layout } from "#infrastructure/presentation/Layout";
import { RootRoute, Router } from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: Layout,
});

export const router = new Router({
  routeTree: rootRoute.children,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
