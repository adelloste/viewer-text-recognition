import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { transcriptionApi } from '../api/split/transcription';
import { Annotation } from '../../definitions/types';

interface TranscriptionState {
  annotations: Annotation[];
  deletedAnnotation: Annotation | undefined;
}

const initialState = {
  annotations: [],
  deletedAnnotation: undefined
} as TranscriptionState;

const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    updateSegmentations(state, action: PayloadAction<{ id: string; coords: number[] }>) {
      const { id, coords } = action.payload;

      state.annotations = state.annotations.reduce((result: Annotation[], value) => {
        if (value.id === id) {
          return [...result, { ...value, segmentation: coords }];
        }
        return [...result, value];
      }, []);
    },
    updateAnnotations(state, action: PayloadAction<Annotation[]>) {
      state.annotations = action.payload.reduce((result: Annotation[], value) => {
        const item = state.annotations.find(a => a.id === value.id);
        if (item) {
          return [...result, { ...item, transcription: value.transcription }];
        }
        return result;
      }, []);
    },
    deleteAnnotation(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.deletedAnnotation = state.annotations.find(a => a.id === id);
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      transcriptionApi.endpoints.getTranscription.matchFulfilled,
      (state, { payload }) => {
        state.annotations = payload.annotations;
      }
    );
    builder.addMatcher(transcriptionApi.endpoints.updateTranscription.matchFulfilled, state => {
      state.deletedAnnotation = undefined;
    });
  }
});

export default transcriptionSlice.reducer;

export const { updateSegmentations, updateAnnotations, deleteAnnotation } =
  transcriptionSlice.actions;
