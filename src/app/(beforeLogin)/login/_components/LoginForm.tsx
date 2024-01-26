"use client";

import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";
import { loginType } from "@/app/DashboardLayout/types/auth/auth";
import Link from "next/link";
import CustomCheckbox from "@/app/(beforeLogin)/_components/CustomCheckbox";
import CustomTextField from "@/app/(beforeLogin)/_components/CustomTextField";
import CustomFormLabel from "@/app/(beforeLogin)/_components/CustomFormLabel";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [helperText, setHelperText] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHelperText("");

    try {
      // const response = await fetch(
      //   `http://192.168.10.11:10882/api/users/login`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     method: "POST",
      //     body: JSON.stringify({ userId: userId, userPassword: userPassword }),
      //   }
      // );

      // console.log("response", response);

      const response = await signIn("credentials", {
        userId: userId,
        userPassword: userPassword,
        redirect: false,
      });

      console.log("LoginForm response => ", response);

      if (response?.error) {
        setHelperText("아이디 or 비밀번호가 일치하지 않습니다.");
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
      setHelperText("아이디 or 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserId(e.target.value);
  };

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">아이디</CustomFormLabel>
            <CustomTextField
              id="username"
              name="userId"
              variant="outlined"
              onChange={handleChangeId}
              fullWidth
            />
          </Box>

          <Box>
            <CustomFormLabel htmlFor="password">비밀번호</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              name="userPassword"
              onChange={handleChangePassword}
              fullWidth
            />
          </Box>

          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    defaultChecked
                    onChange={(e) => console.log(e)}
                  />
                }
                label="기억하기"
              />
            </FormGroup>

            <Stack direction="row" gap={1}>
              <Typography
                component={Link}
                href="/forgot-password"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                비밀번호 찾기
              </Typography>

              <Typography
                component={Link}
                href="/signup"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                회원가입
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            로그인
          </Button>
        </Box>

        {helperText && (
          <Typography variant="h6" mt={1} textAlign="center" color="#F00">
            {helperText}
          </Typography>
        )}
      </form>
      {subtitle}
    </>
  );
};

export default LoginForm;
