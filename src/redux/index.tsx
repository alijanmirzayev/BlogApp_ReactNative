import {configureStore} from '@reduxjs/toolkit'
import PostsSlice from './Slice/PostsSlice'
import FavoriteSlice from './Slice/FavoriteSlice'

export const store = configureStore({
    reducer: {
        posts: PostsSlice,
        favorite: FavoriteSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type StateType = ReturnType<typeof store.getState>