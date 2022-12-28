import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import transcriptionSlice from '../features/Transcription/transcriptionSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    transcription: transcriptionSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
