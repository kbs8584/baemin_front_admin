import { useSelector, useDispatch } from 'react-redux';

import { Grid, Typography } from '@mui/material';
import { Button, Input } from 'components/Atoms';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAccountList, setSearchText } from 'store/manage';

/*
  role :  0(일반), 1(슈퍼관리자), 2(중간관리자)
*/

export default function SearchBar({ onClickSearch }) {
  const dispatch = useDispatch();

  const handleChangeText = e => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: '30px',
      }}
    >
      <Grid item xs={0.6} sx={{ position: 'relative' }}>
        <SearchIcon
          sx={{
            fontSize: '2rem',
            position: 'absolute',
            top: 0,
            transform: 'translate(30%, -50%)',
          }}
        />
      </Grid>

      <Grid item xs>
        <Input onChange={handleChangeText} />
      </Grid>

      <Grid item xs={1}>
        <Button
          onClick={onClickSearch}
          sx={{ bgcolor: 'grey.200', borderRadius: '0 30px 30px 0' }}
        >
          <Typography color="common.black">검색</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
