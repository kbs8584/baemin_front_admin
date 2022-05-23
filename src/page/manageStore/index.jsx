import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
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
import { getUsersInfo } from "api/auth";
import stores from "data/stores";

export default function ManageMember() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("all");

  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    // 회원정보 조회
    getUsersInfo().then((data) => {
      setStoreData(data);
    });
  }, []);

  function filterStore() {
    let filteredStore = [];
    if (selectValue === "all") {
      // Object.keys(stores[0]).forEach((key) => {
      //   const preFilteredStore = filteredStore;
      //   console.log("preFli", preFilteredStore);
      //   filteredStore = stores.filter((store) => {
      //     return store[key] === inputValue;
      //   });
      //   setStoreData([...preFilteredStore, filteredStore]);
      // });
    } else {
      filteredStore = stores.filter(
        (store) => store[selectValue] === inputValue
      );
    }
    setStoreData(filteredStore);
  }

  const columns = [
    {
      headerClassName: "super-app-theme--header",
      field: "CMSId",
      headerName: "CMS ID",
      width: 200,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeName",
      headerName: "매장명(매장ID)",
      width: 344,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "storeEmail",
      headerName: "이메일",
      width: 300,
      editable: false,
    },
    {
      headerClassName: "super-app-theme--header",
      field: "checkCMS",
      headerName: "CMS 보기",
      width: 170,
      renderCell: (params) => {
        return <EditButton>편집하기</EditButton>;
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
              <MenuItem value="CMSId">회원ID</MenuItem>
              <MenuItem value="storeId">매장ID</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10} md={10} sx={{ height: 1 }}>
          <Grid
            // component="form"
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
              onChange={(e) => {
                setInputValue(e.target.value);
                // filterStore();
              }}
            ></InputBase>
            <Button
              sx={{
                height: 1,
                backgroundColor: "grey.200",
                borderRadius: "0 30px 30px 0",
                color: "#000",
              }}
              onClick={() => filterStore()}
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
          height: "631px",
          "& .super-app-theme--header": {
            borderBottom: 3,
          },
        }}
      >
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          autoPageSize
          rows={storeData}
          columns={columns}
          rowsPerPageOptions={[10]}
          sx={{
            textAlign: "center",
            // "& .MuiDataGrid-row": {
            //   border: "1px solid transparent",
            // },
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
