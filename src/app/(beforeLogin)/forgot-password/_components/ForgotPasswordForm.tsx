import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(beforeLogin)/_components/CustomTextField";
import CustomFormLabel from "@/app/(beforeLogin)/_components/CustomFormLabel";

const ForgotPasswordForm = () => {
  return (
    <>
      <Stack mt={4} spacing={2}>
        <Box>
          <CustomFormLabel htmlFor="reset-email">이메일</CustomFormLabel>
          <CustomTextField id="reset-email" variant="outlined" fullWidth />
        </Box>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/"
        >
          비밀번호 찾기
        </Button>
        <Button
          color="primary"
          size="large"
          fullWidth
          component={Link}
          href="/login"
        >
          로그인으로 돌아가기
        </Button>
      </Stack>
    </>
  );
};

export default ForgotPasswordForm;
