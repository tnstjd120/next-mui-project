"use client";

import { Box, Divider, Typography, capitalize } from "@mui/material";
import { useSelectedLayoutSegment } from "next/navigation";

const SegmentDivider = () => {
  const path = useSelectedLayoutSegment();

  return (
    <Box mt={3}>
      <Divider>
        <Typography component="span" fontWeight={300} color="textSecondary">
          {path && capitalize(path)}
        </Typography>
      </Divider>
    </Box>
  );
};

export default SegmentDivider;
