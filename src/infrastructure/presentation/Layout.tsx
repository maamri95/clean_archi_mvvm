import { Outlet } from "@tanstack/react-router";
import { FC } from "react";
import {Header} from "#presentation/components/Header";
import { Flex } from "@chakra-ui/react";

export const Layout: FC = () => {
  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header/>
      <Flex flex={1} alignItems={"stretch"} width={"100%"}>
          <Outlet />
      </Flex>
    </Flex>
  );
};