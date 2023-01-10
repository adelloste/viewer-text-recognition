import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from './definitions/types';

interface AppState {
  notifications: Notification[];
}

const initialState: AppState = {
  notifications: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    enqueueSnackbar(state, action: PayloadAction<Omit<Notification, 'key' | 'dismissed'>>) {
      state.notifications = [
        {
          ...action.payload,
          key: nanoid(),
          dismissed: false
        }
      ].concat(state.notifications);
    },
    removeSnackbar(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        notification => notification.key !== action.payload
      );
    }
  }
});

export default appSlice.reducer;

export const { enqueueSnackbar, removeSnackbar } = appSlice.actions;
