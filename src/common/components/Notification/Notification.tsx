import React, { forwardRef } from 'react';
import { SnackbarContent } from 'notistack';
import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// eslint-disable-next-line react/display-name
const Notification = forwardRef<HTMLDivElement, AlertProps>(
  ({ title, children, severity, ...other }, ref) => {
    return (
      <SnackbarContent ref={ref}>
        <Alert severity={severity} {...other}>
          <AlertTitle>{title}</AlertTitle>
          {children}
        </Alert>
      </SnackbarContent>
    );
  }
);

export default Notification;
