import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wordsApi = createApi( {
    reducerPath: 'words',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://localhost:8000/api/v1',
    } ),
    tagTypes: [ 'Words' ],
    endpoints: ( builder ) => ( {
        getWords: builder.query( {
            // note: an optional `queryFn` may be used in place of `query`
            query: () => '/words',
            // Pick out data and prevent nested properties in a hook or selector
            transformResponse: ( response, meta, arg ) => response.randomDifferentWords,
            providesTags: [ 'Words' ],
        } ),
    } ),
} )
export const { useGetWordsQuery } = wordsApi;