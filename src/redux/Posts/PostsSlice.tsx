import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface detail {
    id: string,
    author: string,
    image: string,
    title: string,
    date: string,
    readTime: string,
    description: string,
    dark: boolean
}

interface initalState {
    data: [],
    status: 'pending' | 'rejected' | 'fulfilled' | null,
    error: any,
    detail: Object<detail>,
    detailStatus: 'pending' | 'rejected' | 'fulfilled' | null,
    detailError: any,
    dark: false | true
}

const initalState: initalState = {
    data: [],
    detail: {},
    detailStatus: null,
    status: null,
    error: null,
    detailError: null,
    dark: false
}

export const getAllPost = createAsyncThunk('posts/getAll', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://643d3ce16afd66da6af14454.mockapi.io/api/v1/contents')
        return response.data
    } catch (error) {
        return rejectWithValue('Məqalələr yüklənərkən xəta baş verdi.')
    }
})

export const getPostById = createAsyncThunk('posts/getById', async (id: any, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://643d3ce16afd66da6af14454.mockapi.io/api/v1/contents/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue('Məqalə yüklənərkən xəta baş verdi.')
    }
})

export const updatePostById = createAsyncThunk('posts/updateById', async (data: any, { rejectWithValue }) => {
    try {
        const response = await axios.put(`https://643d3ce16afd66da6af14454.mockapi.io/api/v1/contents/${data.id}`, {
            title: data.title,
            description: data.description
        })
        return response.data
    } catch (error) {
        return rejectWithValue('Məqalə silinərkən xəta baş verdi.')
    }
})

export const deletePostById = createAsyncThunk('posts/deleteById', async (id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`https://643d3ce16afd66da6af14454.mockapi.io/api/v1/contents/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue('Məqalə silinərkən xəta baş verdi.')
    }
})

export const createPost = createAsyncThunk('posts/create', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://643d3ce16afd66da6af14454.mockapi.io/api/v1/contents/`, data)
        return response.data
    } catch (error) {
        return rejectWithValue('Məqalə yaradılarken xəta baş verdi.')
    }
})


const postsSlice = createSlice({
    name: 'Posts',
    initialState: initalState,
    reducers: {
        darkmode: (state, action: PayloadAction<boolean>) => {
            if (state.dark) {
                state.dark = action.payload
                return
            }
            state.dark = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllPost.pending, (state) => {
            state.status = 'pending'
        }).addCase(getAllPost.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'fulfilled'
        }).addCase(getAllPost.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })

        builder.addCase(getPostById.pending, (state) => {
            state.detailStatus = 'pending'
        }).addCase(getPostById.fulfilled, (state, action) => {
            state.detail = action.payload
            state.detailStatus = 'fulfilled'
        }).addCase(getPostById.rejected, (state, action) => {
            state.detailStatus = 'rejected'
            state.detailError = action.payload
        })

        builder.addCase(deletePostById.pending, (state) => {
            state.detailStatus = 'pending'
        }).addCase(deletePostById.fulfilled, (state, action) => {
            state.detailStatus = 'fulfilled'
        }).addCase(deletePostById.rejected, (state, action) => {
            state.detailStatus = 'rejected'
        })

        builder.addCase(createPost.pending, (state) => {
            state.status = 'pending'
        }).addCase(createPost.fulfilled, (state: any, action) => {
            state.status = 'fulfilled'
        }).addCase(createPost.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export default postsSlice.reducer

export const { darkmode } = postsSlice.actions