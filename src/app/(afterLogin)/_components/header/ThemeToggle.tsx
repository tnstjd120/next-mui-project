import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { setDarkMode } from "@/store/customizer/CustomizerSlice";

const ThemeToggle = () => {
  const mode = useSelector((state: AppState) => state.customizer.activeMode);
  const dispatch = useDispatch();

  const handleClick = (modeArg: "light" | "dark") =>
    dispatch(setDarkMode(modeArg));

  return (
    <ButtonGroup
      size="large"
      sx={{ color: mode === "light" ? "#ddd" : "#555" }}
    >
      <Button
        onClick={() => handleClick("light")}
        color={mode === "light" ? "primary" : "inherit"}
      >
        <WbSunnyTwoToneIcon color="inherit" />
      </Button>
      <Button
        onClick={() => handleClick("dark")}
        color={mode === "dark" ? "primary" : "inherit"}
      >
        <DarkModeTwoToneIcon color="inherit" />
      </Button>
    </ButtonGroup>
  );
};

export default ThemeToggle;
