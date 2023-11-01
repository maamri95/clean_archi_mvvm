import { Outlet } from "@tanstack/react-router";
import { FC } from "react";
export const Layout: FC = () => {
  return (<>
        <h2>Welcome</h2>
    <Outlet />
  </>
  );
};