import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.unsplash.com/"
const CLIENT_ID ="VlcM8qT9DXQJ9leBuNkAPNiI33xuIfsb4ZagTqN8QvY"

export const getAllThunk = createAsyncThunk("photo/getRandomPhotos", async () => {
    const request = await fetch(`${API_URL}/photos/random/?client_id=${CLIENT_ID}&count=10`)
    const json = await request.json()
    
        return json.map(photo => ({
            isFavorite: false,
            id: photo.id,
            description: photo.alt_description,
            date: photo.created_at,
            width: photo.width,
            height: photo.height,
            img: photo.urls.small,
            download: photo.links.download,
            likes: photo.likes
        }))
    }
)

export const getSearchThunk = createAsyncThunk("photo/getSearchPhotos", async (searchWord) => {
    const request = await fetch(`${API_URL}search/photos/?client_id=${CLIENT_ID}&query=${searchWord}`)
    const json = await request.json()

        return json.results.map(photo => ({
            isFavorite: false,
            id: photo.id,
            description: photo.alt_description,
            date: photo.created_at,
            width: photo.width,
            height: photo.height,
            img: photo.urls.small,
            download: photo.links.download,
            likes: photo.likes
        }))
    }
)