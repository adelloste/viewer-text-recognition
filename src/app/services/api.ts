import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Resource } from '../definitions/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: builder => ({
    getResourceById: builder.query<Resource, string>({
      query: () => `data/resource.json`
    })
  })
});

export const { useGetResourceByIdQuery } = api;
