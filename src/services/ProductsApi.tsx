import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ProductsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (builder) => ({
    products: builder.query<unknown, void>({
      query: () => '/products',
    }),
    singleProduct: builder.query<unknown, number>({
        query: (id) => `/products/${id}`,
      }),
  }),
});
export const { useProductsQuery, useSingleProductQuery } = ProductsApi;

export default ProductsApi;
