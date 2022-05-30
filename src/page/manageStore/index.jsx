import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  Select,
  InputBase,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoreList } from "store/storeList";
import { initPassword } from "api/user";

export default function ManageStore() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("all");
  const [storeData, setStoreData] = useState([]);
  const storeDataFromDB = useSelector((state) => state.storeList.storeData);
  const [initialStoreData, setInitialStoreData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStoreList());
  }, []);

  useEffect(() => {
    const newArray = storeDataFromDB.map((store, i) => {
      return { ...store, id: i };
    });
    setInitialStoreData(newArray);
  }, []);

  const handleInitPassword = async (rowInfo) => {
    //emai주소, 회원id보내기
    const storeId = rowInfo.row.storeId;
    const storeEmail = rowInfo.row.storeEmail;
    const CMSId = rowInfo.row.userId;
    const res = await initPassword(storeId, storeEmail, CMSId);
  };

  function filterStore() {
    let filteredStore = [];
    if (selectValue === "all") {
      filteredStore = initialStoreData.filter((store, i) => {
        const storeWithNoId = { ...store };
        delete storeWithNoId.id;
        const values = Object.values(storeWithNoId);
        const matched = values.filter((value) => {
          return value.toString().match(inputValue);
        });
        return matched.length !== 0;
      });
    } else {
      filteredStore = initialStoreData.filter((store) => {
        const matched = store[selectValue].toString().match(inputValue);
        return matched !== null;
      });
    }
    setStoreData(filteredStore);
  }

  function redirectToUserSite(params) {
    const token = sessionStorage.getItem("TOKEN");
    const storeId = params.row.storeId;
    window.location.href = `http://localhost:3000/?storeId=${storeId}&user=${token}`;
  }

  // field를 받아온 데이터의 key와 동일하게 맞춰야 함
  const columns = [
    {
      headerClassName: "super-app-theme--header",
      field: "userId",
      headerName: "CMS ID",
      width: 200,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeName",
      headerName: "매장명",
      width: 200,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeId",
      headerName: "매장ID",
      width: 100,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeEmail",
      headerName: "이메일",
      width: 200,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "checkCMS",
      headerName: "CMS 보기",
      width: 170,
      renderCell: (params) => {
        return (
          <EditButton onClick={() => redirectToUserSite(params)}>
            편집하기
          </EditButton>
        );
      },
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "initPassword",
      headerName: "비밀번호 초기화",
      width: 130,
      renderCell: (params) => {
        return (
          <EditButton
            sx={{
              borderColor: "primary.alert",
              color: "primary.alert",
              "&:hover": {
                backgroundColor: "primary.alertBg",
                borderColor: "red",
              },
            }}
            onClick={() => handleInitPassword(params)}
          >
            초기화
          </EditButton>
        );
      },
      editable: false,
    },
  ];

  return (
    <Container sx={{ width: "100%", minHeight: "100vh" }}>
      <Typography
        variant="h1"
        mt={6}
        mb={5}
        sx={{ fontSize: "subtitle1.fontSize" }}
      >
        매장관리
      </Typography>
      <Grid
        container
        spacing={3}
        mb={4}
        sx={{
          height: 68,
        }}
      >
        <Grid item xs={2} md={2} sx={{ height: 1 }}>
          <FormControl
            fullWidth
            sx={{
              height: 1,
              backgroundColor: "grey.100",
              borderRadius: "30px",
            }}
          >
            <Select
              value={selectValue}
              labelId="category-select-label"
              id="category-select"
              sx={{
                height: 1,
                borderRadius: "30px",
                textAlign: "center",
              }}
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="storeName">매장명</MenuItem>
              <MenuItem value="userId">회원ID</MenuItem>
              {/* 변경필요 */}
              <MenuItem value="storeId">매장ID</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10} md={10} sx={{ height: 1 }}>
          <Grid
            pl={2}
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "30px",
            }}
          >
            <SearchIcon />
            <InputBase
              fullWidth
              autoFocus
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") filterStore();
              }}
            ></InputBase>
            <Button
              sx={{
                height: 1,
                backgroundColor: "grey.200",
                borderRadius: "0 30px 30px 0",
                color: "#000",
              }}
              onClick={filterStore}
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box
        mb={5}
        sx={{
          width: "100%",
          height: "649px",
          "& .super-app-theme--header": {
            borderBottom: 3,
            fontSize: "1rem",
          },
        }}
      >
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          pagination
          rows={storeData}
          columns={columns}
          // rowsPerPageOptions={[10]}
          sx={{
            textAlign: "center",
            "& .MuiDataGrid-row:nth-of-type(2n)": {
              backgroundColor: "grey.100",
            },
          }}
        ></DataGrid>
      </Box>
    </Container>
  );
}
function CustomNoRowsOverlay() {
  return (
    <Grid
      container
      bgcolor="grey.100"
      height="100%"
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      검색 결과가 없습니다.
    </Grid>
  );
}

function EditButton({ children, ...rest }) {
  return (
    <Button variant="outlined" {...rest}>
      {children}
    </Button>
  );
}
