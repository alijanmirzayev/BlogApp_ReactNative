import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface initalState {
    data: [],
    status: 'pending' | 'rejected' | 'fulfilled' | null,
    error: any
}

const initalState = {
    data: [],
    status: null,
    error: null
}

const favoriteSlice = createSlice({
    name: 'Favorite',
    initialState: initalState,
    reducers: {
        favorite: (state: any, action: PayloadAction<any>) => {
            const isExist = state.data.find((item: any) => item.id == action.payload.id)
            if (!isExist) {
                state.data = [...state.data, action.payload]
                return
            }
            state.data = state.data.filter((item: any) => item.id !== action.payload.id)
        }
    }
})

export default favoriteSlice.reducer

export const { favorite } = favoriteSlice.actions