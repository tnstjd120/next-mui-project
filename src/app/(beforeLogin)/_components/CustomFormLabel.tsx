"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, TypographyProps } from "@mui/material";

type CustomTypographyProps = {
  htmlFor: string;
} & TypographyProps;

const CustomFormLabel = styled((props: CustomTypographyProps) => (
  <Typography
    component="label"
    variant="subtitle1"
    fontWeight={600}
    {...props}
  />
))(() => ({
  marginBottom: "5px",
  marginTop: "25px",
  display: "block",
}));

export default CustomFormLabel;
