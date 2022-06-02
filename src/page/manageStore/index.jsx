import { useEffect, useState } from "react";
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
import { changeToken, initPassword } from "api/user";
import { getStoreList } from "api/user";
import Main from "components/layout/Main";

export default function ManageStore() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(0);
  const [initSearch, setInitSearch] = useState(false);
  const [initialSearchData, setInitialSearchData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [rowCount, setRowCount] = useState(initialSearchData?.allCount);
  const [rowCountState, setRowCountState] = useState(rowCount);

  useEffect(() => {
    // 검색이 시작되지 않으면 데이터를 불러오지 않는다
    if (!initSearch) return;
    filterStore(0);
  }, [selectValue]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  function filterStore(page) {
    setInitSearch(true);
    getStoreList(page + 1, inputValue, selectValue).then((data) => {
      setInitialSearchData(data.list);
      setRowCount(Number(data.allCount));
      return data;
    });
  }
  useEffect(() => {
    const newArray = initialSearchData?.map((store, i) => ({
      ...store,
      id: i,
    }));
    setSearchData(newArray);
  }, [initialSearchData]);

  const redirectToUserSite = async (params) => {
    const formdata = new FormData();
    formdata.append("userId", params.row.userId);
    const res = await changeToken(formdata);
    const token = res.token;

    const storeId = params.row.storeId;
    window.location.href = `http://localhost:3000/?storeId=${storeId}&user=${token}`;
  };

  const handleInitPassword = async (rowInfo) => {
    //emai주소, 회원id보내기
    const storeId = rowInfo.row.storeId;
    const email = rowInfo.row.email;
    const CMSId = rowInfo.row.userId;
    await initPassword(storeId, email, CMSId);
  };

  // field를 받아온 데이터의 key와 동일하게 맞춰야 함
  const columns = [
    {
      headerClassName: "super-app-theme--header",
      field: "userId",
      headerName: "CMS ID",
      width: 234,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeName",
      headerName: "매장명",
      width: 240,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeId",
      headerName: "매장ID",
      width: 120,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "email",
      headerName: "이메일",
      width: 240,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "checkCMS",
      headerName: "CMS 보기",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <EditButton
            onClick={() => redirectToUserSite(params)}
            sx={{
              backgroundColor: "common.white",
            }}
          >
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
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <EditButton
            sx={{
              borderColor: "primary.alert",
              backgroundColor: "common.white",
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
    <Main>
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
              <MenuItem value={0}>전체</MenuItem>
              <MenuItem value={2}>매장명</MenuItem>
              <MenuItem value={1}>회원ID</MenuItem>
              <MenuItem value={3}>매장ID</MenuItem>
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
            <SearchIcon sx={{ fontSize: "2rem" }} />
            <InputBase
              fullWidth
              autoFocus
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") filterStore(0);
              }}
            ></InputBase>
            <Button
              sx={{
                height: 1,
                backgroundColor: "grey.200",
                borderRadius: "0 30px 30px 0",
                color: "#000",
              }}
              onClick={() => filterStore(0)}
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
            borderBottom: 6,
            fontSize: "1rem",
          },
          "& .super-app-theme--header:nth-of-type(1)": {
            paddingLeft: 5,
          },
        }}
      >
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          rowsPerPageOptions={[10]}
          rows={searchData}
          columns={columns}
          paginationMode="server"
          pageSize={10}
          rowCount={rowCountState}
          sx={{
            borderRadius: 3,
            textAlign: "center",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:nth-of-type(2n)": {
              backgroundColor: "grey.100",
            },
            "& .MuiDataGrid-cell:nth-of-type(1)": {
              paddingLeft: 5,
            },
            "& .MuiDataGrid-cell": {
              border: 0,
            },
            "& .MuiDataGrid-columnSeparator--sideRight": {
              display: "none",
            },
          }}
          onPageChange={(page) => {
            filterStore(page);
          }}
        />
      </Box>
    </Main>
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
