import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Table({ columns, rows, ...rest }) {
  return (
    <TableContainer>
      <DataGrid
        components={{
          NoRowsOverlay: NoRowsOverlay,
        }}
        rowsPerPageOptions={[10]}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowCount={rows.length} // -> all count로 바꾸어야 함
        sx={{
          borderRadius: 3,
          textAlign: 'center',

          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },

          '& .MuiDataGrid-row:nth-of-type(2n)': {
            // 짝수번째 Row background color
            backgroundColor: 'grey.100',
          },
          '& .MuiDataGrid-cell:nth-of-type(1)': {
            // 첫번째 셀
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
        {...rest}
      />
    </TableContainer>
  );
}

const TableContainer = ({ children }) => (
  <Box
    mb={5}
    sx={{
      width: 1,
      height: '631px',

      '& .super-app-theme--header:nth-of-type(1)': {
        paddingLeft: 5,
      },
    }}
  >
    {children}
  </Box>
);

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
