import { Annotation, Resource } from '../../definitions/types';
import { api } from '../api';

export const transcriptionApi = api.injectEndpoints({
  endpoints: builder => ({
    getTranscription: builder.query<Resource, string>({
      query: id => `transcription/${id}`
    }),
    updateTranscription: builder.mutation<void, { id: string; annotations: Annotation[] }>({
      query: ({ id, annotations }) => ({
        url: `transcription/${id}`,
        method: 'POST',
        body: annotations
      })
    })
  })
});

export const { useGetTranscriptionQuery, useUpdateTranscriptionMutation } = transcriptionApi;
