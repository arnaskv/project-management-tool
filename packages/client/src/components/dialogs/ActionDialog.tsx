import { FC, ReactNode } from 'react';
import { Dialog, DialogTitle, IconButton, DialogProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ActionDialogProps extends DialogProps {
  title: string;
  handleClose: () => void;
  children: ReactNode;
}

const ActionDialog: FC<ActionDialogProps> = ({ title, handleClose, children, ...dialogProps }) => {
  return (
    <Dialog
      maxWidth={'md'}
      {...dialogProps}
      onClose={handleClose}
      PaperProps={{
        sx: {
          boxShadow: 'none',
          minWidth: '600px',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        color="inherit"
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default ActionDialog;
