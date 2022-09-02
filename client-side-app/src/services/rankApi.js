import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rankApi = createApi( {
    reducerPath: 'rank',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://localhost:8000/api/v1',
    } ),
    tagTypes: [ 'Rank' ],
    endpoints: ( build ) => ( {
        postScore: build.mutation( {
            query( body ) {
                return {
                    url: `/rank`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [ { type: 'Rank' } ],
        } ),

    } )
} )
export const { usePostScoreMutation } = rankApi;