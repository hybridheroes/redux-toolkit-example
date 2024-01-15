import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ColorData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export const colorsApi = createApi({
  reducerPath: 'colorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
  endpoints: builder => ({
    getColors: builder.query<{ data: ColorData[] }, void>({
      query: () => 'colors?per_page=12',
    }),
    getColorById: builder.query<{ data: ColorData }, number>({
      query: id => `colors/${id}?delay=1`,
    }),
  }),
});

export const { useGetColorsQuery, useGetColorByIdQuery } = colorsApi;
