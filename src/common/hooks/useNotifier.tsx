import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from './useApp';
import { removeSnackbar } from '../../appSlice';
import Notification from '../components/Notification/Notification';

const useNotifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(store => store.app.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    notifications.forEach(({ key, title, message, options, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }
      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        persist: true,
        preventDuplicate: true,
        content: () => (
          <Notification id={key} title={title} onClose={() => closeSnackbar(key)} {...options}>
            {message}
          </Notification>
        ),
        onExited: () => {
          dispatch(removeSnackbar(key));
        }
      });
    });
  }, [closeSnackbar, dispatch, enqueueSnackbar, notifications]);
};

export default useNotifier;
