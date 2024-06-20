import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

const Toast: FC<Props> = ({ open, message, severity }) => {
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={action}
    >
      <Alert variant="outlined" severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
