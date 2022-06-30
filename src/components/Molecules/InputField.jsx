import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { Button, Input } from 'components/Atoms';

export default function InputField({
  type = 'text',
  title,
  name,
  value,
  placeholder = '',
  defaultInputValue,
  disabled = false,
  hasButton = false,
  buttonName,
  onClickButton,
  onChangeInput,
}) {
  return (
    <Grid container>
      <StyledTitleGrid item alignSelf="center" xs={3} p={3}>
        <Typography align="center">{title}</Typography>
      </StyledTitleGrid>

      <StyledInputFieldGrid item xs p={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Input
              type={type}
              name={name}
              value={value}
              defaultValue={defaultInputValue}
              onChange={onChangeInput}
              placeholder={placeholder}
              disabled={disabled}
              fullWidth
            />
          </Grid>

          {hasButton ? (
            <Grid item>
              <Button variant="outlined" onClick={onClickButton}>
                {buttonName}
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </StyledInputFieldGrid>
    </Grid>
  );
}

const StyledTitleGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey['100'],
  border: '1px solid',
  borderRight: 'none',
  borderColor: theme.palette.grey['200'],
  borderRadius: '5px 0 0 5px',
}));

const StyledInputFieldGrid = styled(Grid)(({ theme }) => ({
  border: '1px solid',
  borderLeft: 'none',
  borderColor: theme.palette.grey['200'],
  borderRadius: '0 5px 5px 0',
}));

/*
  Delete number type input default arrows
  'input::-webkit-inner-spin-button': {
     WebkitAppearance: 'none',
     margin: 0,
  }

  Q) What is onBlur in InputBase
  Q) how to describe initialize function when getting with parameter
 */
