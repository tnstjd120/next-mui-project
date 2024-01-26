import { Stack, Typography } from "@mui/material";
import SignupForm from "./_components/SignupForm";
import Link from "next/link";

export default async function Signup() {
  return (
    <SignupForm
      subtitle={
        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" fontWeight="400">
            사용하고 있는 계정이 있으신가요?
          </Typography>
          <Typography
            component={Link}
            href="/login"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            로그인
          </Typography>
        </Stack>
      }
    />
  );
}
