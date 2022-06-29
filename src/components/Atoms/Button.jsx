import { Button as BaseButton } from '@mui/material';

export default function Button({ disabled = false, children, ...rest }) {
  return (
    <BaseButton disabled={disabled} fullWidth {...rest}>
      {children}
    </BaseButton>
  );
}
