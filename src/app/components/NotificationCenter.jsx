// components/NotificationCenter.jsx
import { useCallback, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({
    message: '',
    severity: 'info',
  });

  const show = useCallback(({ message, severity = 'info' }) => {
    setConfig({ message, severity });
    setOpen(true);
  }, []);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // простой API: window.notify.success('...')
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const notifyApi = {
      success: (msg) => show({ message: msg, severity: 'success' }),
      error: (msg) => show({ message: msg, severity: 'error' }),
      warning: (msg) => show({ message: msg, severity: 'warning' }),
      info: (msg) => show({ message: msg, severity: 'info' }),
    };

    window.notify = notifyApi;

    return () => {
      if (window.notify === notifyApi) {
        delete window.notify;
      }
    };
  }, [show]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={config.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {config.message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationCenter;
