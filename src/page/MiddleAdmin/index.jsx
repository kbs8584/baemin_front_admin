import { useState } from 'react';

import {
  Typography,
  Select,
  MenuItem,
  Button,
  Grid,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Main from 'components/layout/Main';

export default function MiddleAdmin() {
  const [searchMenuIndex, setSearchMenuIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  return (
    <Main>
      <Grid container justifyContent="space-between" alignItems="center" py={4}>
        <Typography fontSize="32px" fontWeight={700}>
          중간관리자
        </Typography>
        <Button variant="contained">
          <Typography fontSize="14px">신규 중간 관리자 ID 생성</Typography>
        </Button>
      </Grid>

      <Grid container alignItems="center" columnSpacing={3}>
        <Grid item xs={2}>
          <Select
            value={searchMenuIndex}
            onChange={e => setSearchMenuIndex(e.target.value)}
            // label="전체"
            fullWidth
            sx={{
              bgcolor: 'grey.100',
              borderRadius: '30px',
              textAlign: 'center',
            }}
          >
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>CMS ID</MenuItem>
            <MenuItem value={2}>중간관리자명</MenuItem>
            <MenuItem value={3}>이메일</MenuItem>
          </Select>
        </Grid>

        <Grid item xs>
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
              <InputBase fullWidth />
            </Grid>
            <Grid item xs={1}>
              <Button
                fullWidth
                sx={{ bgcolor: 'grey.200', borderRadius: '0 30px 30px 0' }}
              >
                <Typography color="common.black">검색</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Main>
  );
}
