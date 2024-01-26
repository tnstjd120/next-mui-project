import { IUserResponse } from "@/types/User";
import { Order } from "./CustomTable";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomCheckbox from "@/app/_components/forms/CustomCheckbox";
import { grey } from "@mui/material/colors";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import { API_PATH } from "@/app/api/API_PATH";
import { useSession } from "next-auth/react";

type Props = {
  rows: IUserResponse[];
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selected: readonly string[];
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
};

const CustomTableRow = (props: Props) => {
  const { rows, order, orderBy, page, rowsPerPage, selected, handleClick } =
    props;

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | boolean | null },
    b: { [key in Key]: number | string | boolean | null }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  const [userSettingsOpen, setUserSettingsOpen] = useState(false);
  const handleSettingsClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setUserSettingsOpen((prev) => !prev);
  };

  const [test, setTest] = useState<IUserResponse[]>([]);

  const session = useSession();

  useEffect(() => {
    // const getUsers = () => {
    //   const { PATH, METHOD } = API_PATH.USERS.USERS_INFO_GET;
    //   const response = fetchExtended(PATH, {
    //     method: METHOD,
    //   });

    //   console.log("response => ", response);
    // };

    const { PATH, METHOD } = API_PATH.USERS.USERS_INFO_GET;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${PATH}`, {
      headers: {
        "Conetent-Type": "application/json",
        method: METHOD,
        Authorization: `Bearer ${session.data?.user?.accessToken}`,
      },
    })
      .then((response) => {
        console.log(response);

        // setTest(true);
      })
      .catch((error) => console.error(error));
  });

  return (
    <>
      {test &&
        stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row: IUserResponse, index) => {
            const isItemSelected = isSelected(row.userId);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.userId)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.userId}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Tooltip
                      title={
                        row.controlStatus === 0
                          ? "오프라인"
                          : row.controlStatus === 1
                          ? "온라인"
                          : "자리비움"
                      }
                      arrow
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        color={row.controlStatus === 1 ? "success" : "warning"}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor:
                              row.controlStatus === 0 ? grey[500] : "",
                          },
                        }}
                        badgeContent=" "
                      >
                        <Avatar
                          src={row.profileImage}
                          alt={`${row.userName} 프로필 이미지`}
                          sx={{ width: 56, height: 56 }}
                        />
                      </Badge>
                    </Tooltip>
                    <Box
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="600">
                        {row.userName}
                      </Typography>

                      <Typography color="textSecondary" variant="subtitle2">
                        {row.roleLabel}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle2">{row.userId}</Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    color={row.isUse ? "success" : "error"}
                    sx={{
                      borderRadius: "6px",
                    }}
                    size="small"
                    label={row.isUse ? "승인" : "미승인"}
                  />
                </TableCell>

                <TableCell>
                  <Typography>
                    {format(new Date(row.createdAt as string), "yyyy. MM. dd")}
                  </Typography>
                </TableCell>

                <TableCell width={60}>
                  <Tooltip title="설정">
                    <IconButton size="small" onClick={handleSettingsClick}>
                      <IconDotsVertical size="1.1rem" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}

      {/* {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )} */}
    </>
  );
};

export default CustomTableRow;
