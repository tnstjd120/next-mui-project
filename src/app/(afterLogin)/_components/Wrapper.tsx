"use client";

import { Box, Container, Stack, useTheme } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Customizer from "./shared/customizer/Customizer";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { IUserLogin } from "@/types/User";

type Props = { children: ReactNode; me: IUserLogin };

const Wrapper = ({ children, me }: Props) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  return (
    <Stack direction="row" minHeight="100dvh" width="100%">
      <title>Quantum QIDI</title>

      <Sidebar me={me} />

      <Stack
        flexGrow={1}
        paddingBottom="60px"
        zIndex={1}
        width="100%"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        <Header />

        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>

        <Customizer />
      </Stack>
    </Stack>
  );
};

export default Wrapper;
