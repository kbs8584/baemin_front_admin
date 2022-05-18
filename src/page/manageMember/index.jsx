import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "store/auth";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  Select,
  InputBase,
  Paper,
  Button,
  Box,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import MainLogo from "assets/main_logo.png";
// import EditButton from "components/Button";

export default function ManageMember() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.user);

  const columns = [
    { field: "CMSId", headerName: "CMS ID", width: 200 },
    {
      field: "storeName",
      headerName: "매장명(매장ID)",
      width: 644,
      editable: false,
    },
    {
      field: "checkCMS",
      headerName: "CMS 보기",
      width: 150,
      editable: false,
    },
    {
      field: "initPassword",
      headerName: "비밀번호 초기화",
      width: 150,
      editable: false,
    },
  ];
  console.log(editButton());
  const rows = [
    {
      id: 1,
      CMSId: "Snow",
      storeName: "Jon",
      checkCMS: `${editButton().props.children}`,
      initPassword: "1",
    },
    {
      id: 2,
      CMSId: "Lannister",
      storeName: "Cersei",
      checkCMS: `${editButton().props.children}`,
      initPassword: "1",
    },
    {
      id: 3,
      CMSId: "Lannister",
      storeName: "Jaime",
      checkCMS: `${editButton().props.children}`,
      initPassword: "1",
    },
    {
      id: 4,
      CMSId: "Lannister",
      storeName: "Jaime",
      checkCMS: `${editButton().props.children}`,
      initPassword: "1",
    },
    {
      id: 5,
      CMSId: "Lannister",
      storeName: "Jaime",
      checkCMS: `${editButton().props.children}`,
      initPassword: "1",
    },
    {
      id: 6,
      CMSId: "Lannister",
      storeName: "Jaime",
      checkCMS: `${editButton().props.children}`,
      initPassword: "1",
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
        회원관리
      </Typography>
      <Grid
        container
        spacing={3}
        mb={4}
        sx={{
          height: 68,
        }}
      >
        <Grid item xs={1} md={2} sx={{ height: 1 }}>
          <FormControl
            fullWidth
            sx={{
              height: 1,
              backgroundColor: "grey.100",
              borderRadius: "30px",
            }}
          >
            <Select
              value={1}
              labelId="category-select-label"
              id="category-select"
              sx={{
                height: 1,
                borderRadius: "30px",
                textAlign: "center",
              }}
            >
              <MenuItem value={1}>전체</MenuItem>
              <MenuItem value={2}>매장명</MenuItem>
              <MenuItem value={3}>회원ID</MenuItem>
              <MenuItem value={4}>매장ID</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} md={10} sx={{ height: 1 }}>
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
            <InputBase fullWidth></InputBase>
            <Button
              sx={{
                height: 1,
                backgroundColor: "grey.200",
                borderRadius: "0 30px 30px 0",
                color: "#000",
              }}
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", height: "700px" }}>
        <DataGrid
          autoPageSize
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ textAlign: "center" }}
        ></DataGrid>
      </Box>
    </Container>
  );
}

const editButton = () => {
  return <Button variant="contained">편집하기</Button>;
};
