import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { wordsApi } from '../services/wordsApi'
import { rankApi } from '../services/rankApi'
import { appSlice } from './features/appSlice'

export const store = configureStore( {
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [ wordsApi.reducerPath ]: wordsApi.reducer,
        [ rankApi.reducerPath ]: rankApi.reducer,
        appStore: appSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware().concat( wordsApi.middleware ).concat( rankApi.middleware ),
} )

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners( store.dispatch )