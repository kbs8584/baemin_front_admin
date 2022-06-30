import { Box, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { InputField } from 'components/Molecules';
import { Button } from 'components/Atoms';

export default function IssuedAccount({ onClose }) {
  return (
    <>
      <Box p={2}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontSize="20px" fontWeight={800}>
            아래 정보로 신규 ID 생성이 완료되었습니다.
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 5,
            }}
          >
            <CloseIcon sx={{ transform: 'scale(1.3)' }} />
          </IconButton>
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="중간관리자 ID"
            placeholder="생성된 Value 넣으세요"
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField title="관리자명" placeholder="생성된 Value 넣으세요" />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField title="이메일" placeholder="생성된 Value 넣으세요" />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField title="비밀번호" placeholder="생성된 Value 넣으세요" />
        </Grid>

        <Button variant="contained">
          <Typography fontWeight={900} py={1}>
            중간관리자 매장 연동하기
          </Typography>
        </Button>
      </Box>
    </>
  );
}
