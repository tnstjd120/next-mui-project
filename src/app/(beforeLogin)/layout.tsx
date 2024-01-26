import { ReactNode } from "react";
import { Box, Card, Grid, IconButton, Stack } from "@mui/material";
import Logo from "../_components/Logo";
import Image from "next/image";
import SegmentDivider from "./_components/SegmentDivider";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>

            <Stack mt={5} mb={3} direction="row" justifyContent="space-between">
              <IconButton>
                <Image
                  src="/instagram.svg"
                  alt="instagram"
                  width={32}
                  height={32}
                />
              </IconButton>

              <IconButton>
                <Image
                  src="/facebook.svg"
                  alt="facebook"
                  width={32}
                  height={32}
                />
              </IconButton>

              <IconButton>
                <Image
                  src="/nextunicorn.png"
                  alt="nextunicorn"
                  width={32}
                  height={32}
                />
              </IconButton>

              <IconButton>
                <Image
                  src="/linkedin.svg"
                  alt="linkedin"
                  width={32}
                  height={32}
                />
              </IconButton>

              <IconButton>
                <Image src="/naver.svg" alt="naver" width={32} height={32} />
              </IconButton>

              <IconButton>
                <Image src="/notion.svg" alt="notion" width={32} height={32} />
              </IconButton>
            </Stack>

            <SegmentDivider />

            {children}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
