import { ThemeProvider } from "./theme";
import { QueryProvider } from "./query";
import { FC } from "react";
import { RouterProvider } from "./router";

export const Provider: FC = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </ThemeProvider>
  );
};
