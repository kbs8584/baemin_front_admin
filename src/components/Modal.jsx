import { Dialog } from "@mui/material";

export default function Modal({
  dialogOpen,
  setDialogOpen,
  children,
  ...rest
}) {
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} {...rest}>
      {children}
    </Dialog>
  );
}
