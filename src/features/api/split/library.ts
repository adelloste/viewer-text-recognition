import { Collection, Lib } from '../../../definitions/types';
import { api } from '../api';

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
      addCollection: builder.mutation<void, { name: string; description: string }>({
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
      })
    })
  });

export const {
  useGetLibraryQuery,
  useGetCollectionQuery,
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  useUploadMutation
} = libraryApi;
