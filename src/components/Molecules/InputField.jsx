import { Grid, IconButton, Typography } from '@mui/material';
import { Button, Input } from 'components/Atoms';

export default function InputField({
  title,
  placeholder,
  hasButton,
  buttonName,
}) {
  return (
    <Grid container>
      <Grid
        item
        alignSelf="center"
        xs={3}
        p={3}
        sx={{
          bgcolor: 'grey.100',
          border: '1px solid',
          borderRight: 'none',
          borderColor: 'grey.200',
          borderRadius: '5px 0 0 5px',
        }}
      >
        <Typography align="center">{title}</Typography>
      </Grid>

      <Grid
        item
        xs
        p={2}
        sx={{
          border: '1px solid',
          borderLeft: 'none',
          borderColor: 'grey.200',
          borderRadius: '0 5px 5px 0',
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Input placeholder={placeholder} fullWidth />
          </Grid>

          {hasButton ? (
            <Grid item>
              <Button variant="outlined">{buttonName}</Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
