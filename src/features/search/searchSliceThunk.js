import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.unsplash.com/"
const CLIENT_ID ="VlcM8qT9DXQJ9leBuNkAPNiI33xuIfsb4ZagTqN8QvY"

export const getAllThunk = createAsyncThunk("randomPhotos/getRandomPhotos", async (data) => {
    const request = await fetch(`${API_URL}/photos/random/?client_id=${CLIENT_ID}&count=15`)
    const json = await request.json()
    console.log(json)
        return json.map(photo => ({
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

export const getSearchThunk = createAsyncThunk("searchPhotos/getSearchPhotos", async (data) => {
    const request = await fetch(`${API_URL}/photos/random/?client_id=${CLIENT_ID}&count=15`)
    const json = await request.json()
    console.log(json)
        return json.map(photo => ({
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