import { Lib } from '../../definitions/types';
import { api } from '../api';

export const libraryApi = api
  .enhanceEndpoints({
    addTagTypes: ['Library']
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
      deleteCollection: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `library/collection/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Library']
      })
    })
  });

export const { useGetLibraryQuery, useAddCollectionMutation, useDeleteCollectionMutation } =
  libraryApi;
