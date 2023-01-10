import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { api } from '../features/api/api';
import appSlice from '../appSlice';
import transcriptionSlice from '../features/transcription/transcriptionSlice';
import { handleError } from './middlewares/handle-error';

export const store = configureStore({
  reducer: {
    app: appSlice,
    transcription: transcriptionSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware, handleError)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
