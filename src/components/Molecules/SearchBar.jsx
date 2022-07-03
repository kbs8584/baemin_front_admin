import { useSelector, useDispatch } from 'react-redux';

import { Grid, Typography } from '@mui/material';
import { Button, Input } from 'components/Atoms';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAccountList, setSearchText } from 'store/manage';

export default function SearchBar({ role }) {
  const inputText = useSelector(state => state.manage.searchText);

  const dispatch = useDispatch();

  const handleClickSearch = () => {
    const data = {
      cpage: 1,
      rowItem: 10,
      sortMode: 1,
      searchInput: inputText,
      searchMode: 0,
      orderMode: false,
      role: role,
    };

    dispatch(fetchAccountList(data));
  };

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
          onClick={handleClickSearch}
          sx={{ bgcolor: 'grey.200', borderRadius: '0 30px 30px 0' }}
        >
          <Typography color="common.black">검색</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
