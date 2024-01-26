import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "@/store/hooks";
import { IconPower } from "@tabler/icons-react";
import { AppState } from "@/store/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUserLogin } from "@/types/User";

type Props = { me: IUserLogin };

export const Profile = ({ me }: Props) => {
  const router = useRouter();

  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  // const me = {
  //   id: 1,
  //   name: "권순성",
  //   roleId: 1,
  //   profile: "/images/profile/user-1.jpg",
  // };

  const handleLogout = async () => {
    await signOut({ redirect: false });

    router.replace("/login");
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      <Avatar
        src={"/images/profile/user-1.jpg"}
        alt="프로필 이미지"
        sx={{ height: hideMenu ? 24 : 40, width: hideMenu ? 24 : 40 }}
      />

      {!hideMenu ? (
        <>
          <Box>
            <Typography variant="h6">{me.userName}</Typography>
            <Typography variant="caption">{me.userId}</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={handleLogout}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
