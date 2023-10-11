import { createSlice } from "@reduxjs/toolkit";
import { getAllThunk, getSearchThunk } from "./searchSliceThunk";



export const searchSlice = createSlice({
    name: "photo",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {
        getPhoto: (state,action) => {
            state.data = [...state.data,action.payload]
        },
        updatePhotoList: (state, action) => {
            state.data = action.payload
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllThunk.pending, (state,action) => {
            state.status = "pending"
        }).addCase(getAllThunk.rejected,(state,action) => {
            state.status = "rejected"
            state.error = action.error.message
        }).addCase(getAllThunk.fulfilled,(state,action) => {
            state.status = "fulfilled"
            state.data = action.payload
        }).addCase(getSearchThunk.pending, (state,action) => {
            state.status = "pending"
        }).addCase(getSearchThunk.rejected,(state,action) => {
            state.status = "rejected"
            state.error = action.error.message
        }).addCase(getSearchThunk.fulfilled,(state,action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
    }
});

export const {getPhoto, updatePhotoList} = searchSlice.actions
export const getPhotoData = (state) => state.photo.data
export const getPhotoStatus = (state) => state.photo.status
export const getPhotoError = (state) => state.photo.error