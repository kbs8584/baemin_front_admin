import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Table({ columns, rows }) {
  return (
    <DataGrid
      components={{
        NoRowsOverlay: NoRowsOverlay,
      }}
      rowsPerPageOptions={[10]}
      getRowId={row => row.userSeq} // 변경 가능성 있음
      rows={rows}
      columns={columns}
      // paginationMode="server" 왜...........??????
      pageSize={10}
      rowCount={rows.length}
      sx={{
        borderRadius: 3,
        textAlign: 'center',

        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
        '& .MuiDataGrid-row:nth-of-type(2n)': {
          backgroundColor: 'grey.100',
        },
        '& .MuiDataGrid-cell:nth-of-type(1)': {
          paddingLeft: 5,
        },
        '& .MuiDataGrid-cell': {
          border: 0,
        },
        '& .MuiDataGrid-columnSeparator--sideRight': {
          display: 'none',
        },
      }}
      // onPageChange={page => {
      //   filterStore(page);
      // }}
    />
  );
}

const NoRowsOverlay = () => (
  <Grid
    container
    bgcolor="grey.100"
    height="100%"
    sx={{ justifyContent: 'center', alignItems: 'center' }}
  >
    검색 결과가 없습니다.
  </Grid>
);
