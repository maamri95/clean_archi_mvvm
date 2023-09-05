import { Layout } from "#infrastructure/presentation/Layout";
import { RootRoute, Router } from "@tanstack/react-router";

export const rootRoute = new RootRoute({
  component: Layout,
});

const routeTree = rootRoute.addChildren([])
export const router = new Router({
  routeTree: routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
