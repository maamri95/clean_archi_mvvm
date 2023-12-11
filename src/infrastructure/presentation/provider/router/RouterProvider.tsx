import { FC } from "react";
import { RouterProvider as RouterProviderCore } from "@tanstack/react-router";
import { router } from "#src/app.route.tsx";

export const RouterProvider: FC = () => {
  return <RouterProviderCore router={router} />;
};
