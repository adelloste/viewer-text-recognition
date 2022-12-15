import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lib, Resource } from '../definitions/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: builder => ({
    getLibrary: builder.query<Lib, void>({
      query: () => `data/library.json`
    }),
    getResourceById: builder.query<Resource, string>({
      query: () => `data/resource.json`
    })
  })
});

export const { useGetLibraryQuery, useGetResourceByIdQuery } = api;
