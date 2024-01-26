import { Box, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { registerType } from "@/app/DashboardLayout/types/auth/auth";

import Link from "next/link";
import CustomFormLabel from "@/app/(beforeLogin)/_components/CustomFormLabel";
import CustomTextField from "@/app/(beforeLogin)/_components/CustomTextField";

const SignupForm = ({ title, subtitle, subtext }: registerType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Stack mb={3}>
        <Box>
          <CustomFormLabel htmlFor="name">이름</CustomFormLabel>
          <CustomTextField id="name" variant="outlined" fullWidth />
        </Box>

        <Box>
          <CustomFormLabel htmlFor="email">이메일</CustomFormLabel>
          <CustomTextField id="email" variant="outlined" fullWidth />
        </Box>

        <Box>
          <CustomFormLabel htmlFor="id">아이디</CustomFormLabel>
          <CustomTextField id="id" variant="outlined" fullWidth />
        </Box>

        <Box>
          <CustomFormLabel htmlFor="password">비밀번호</CustomFormLabel>
          <CustomTextField id="password" variant="outlined" fullWidth />
        </Box>
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="/auth/auth1/login"
      >
        회원가입
      </Button>
    </Box>
    {subtitle}
  </>
);

export default SignupForm;
