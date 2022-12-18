import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lib, Resource } from '../definitions/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['Library'],
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
    }),
    getResourceById: builder.query<Resource, string>({
      query: () => `transcription/resource`
    })
  })
});

export const {
  useGetLibraryQuery,
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  useGetResourceByIdQuery
} = api;
