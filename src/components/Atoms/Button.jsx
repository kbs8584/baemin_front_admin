import { Button as BaseButton } from '@mui/material';

export default function Button({ children, ...rest }) {
  return (
    <BaseButton fullWidth {...rest}>
      {children}
    </BaseButton>
  );
}
