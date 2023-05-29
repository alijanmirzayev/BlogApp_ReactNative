import {configureStore} from '@reduxjs/toolkit'
import PostsSlice from './Posts/PostsSlice'

export const store = configureStore({
    reducer: {
        posts: PostsSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type StateType = ReturnType<typeof store.getState>