import { Resource } from '../../../definitions/types';
import { api } from '../api';
import { saveAs } from 'file-saver';

export const transcriptionApi = api.injectEndpoints({
  endpoints: builder => ({
    getTranscription: builder.query<Resource, string | undefined>({
      query: id => `transcription/${id}`,
      keepUnusedDataFor: 1
    }),
    updateTranscription: builder.mutation<
      Resource,
      { id: string | undefined; transcription: Resource }
    >({
      query: ({ id, transcription }) => ({
        url: `transcription/${id}`,
        method: 'POST',
        body: transcription
      })
    }),
    updateSegmentations: builder.mutation<Resource, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `transcription/${id}/segmentations`,
        method: 'PATCH'
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            transcriptionApi.util.updateQueryData('getTranscription', id, draft => {
              Object.assign(draft, data);
            })
          );
        } catch {
          //
        }
      }
    }),
    updateAnnotations: builder.mutation<Resource, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `transcription/${id}/annotations`,
        method: 'PATCH'
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            transcriptionApi.util.updateQueryData('getTranscription', id, draft => {
              Object.assign(draft, data);
            })
          );
        } catch {
          //
        }
      }
    }),
    downloadTranscription: builder.mutation<null, { id: string | undefined }>({
      queryFn: async ({ id }, _api, _extraOptions, baseQuery) => {
        // TODO: manage error
        const result = await baseQuery({
          url: `transcription/${id}/download`,
          responseHandler: response => response.blob()
        });
        // save file
        saveAs(result.data as Blob);

        return {
          data: null
        };
      }
    })
  })
});

export const {
  useGetTranscriptionQuery,
  useUpdateTranscriptionMutation,
  useUpdateSegmentationsMutation,
  useUpdateAnnotationsMutation,
  useDownloadTranscriptionMutation
} = transcriptionApi;
