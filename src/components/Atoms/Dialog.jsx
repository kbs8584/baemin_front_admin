import { Dialog as _Dialog } from '@mui/material';

export default function Dialog({ open, onClose, children, ...rest }) {
  return (
    <_Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth {...rest}>
      {children}
    </_Dialog>
  );
}
