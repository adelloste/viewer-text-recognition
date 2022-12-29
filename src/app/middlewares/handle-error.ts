import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { enqueueSnackbar } from '../../appSlice';

export const handleError: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    api.dispatch(
      enqueueSnackbar({
        title: 'Attention',
        message: action.payload.data,
        options: { severity: 'error' }
      })
    );
  }

  return next(action);
};
