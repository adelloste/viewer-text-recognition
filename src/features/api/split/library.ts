import { Collection, Lib } from '../../../definitions/types';
import { api } from '../api';
import { saveAs } from 'file-saver';

export const libraryApi = api
  .enhanceEndpoints({
    addTagTypes: ['Library', 'Collection']
  })
  .injectEndpoints({
    endpoints: builder => ({
      getLibrary: builder.query<Lib, void>({
        query: () => `library`,
        providesTags: ['Library']
      }),
      addCollection: builder.mutation<Collection, Pick<Collection, 'name' | 'description'>>({
        query: data => ({
          url: 'library/collection',
          method: 'POST',
          body: data
        }),
        invalidatesTags: ['Library']
      }),
      getCollection: builder.query<Collection[], { id: string | undefined }>({
        query: ({ id }) => `library/collection/${id}`,
        providesTags: ['Collection']
      }),
      deleteCollection: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `library/collection/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Library']
      }),
      upload: builder.mutation<void, { id: string | undefined; data: FormData }>({
        query: ({ id, data }) => ({
          url: `library/collection/${id}/upload`,
          method: 'POST',
          body: data
        }),
        invalidatesTags: ['Collection']
      }),
      download: builder.mutation<null, { id: string | undefined }>({
        queryFn: async ({ id }, _api, _extraOptions, baseQuery) => {
          // TODO: manage error
          const result = await baseQuery({
            url: `library/collection/${id}/download`,
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
  useGetLibraryQuery,
  useGetCollectionQuery,
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  useUploadMutation,
  useDownloadMutation
} = libraryApi;
