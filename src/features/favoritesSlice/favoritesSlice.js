
import { createSlice } from '@reduxjs/toolkit'

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
    
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {

      const photoIdToRemove = action.payload
      return state.filter((photo) => photo.id !== photoIdToRemove)
    },
    updatePhotoFavoritesList: (state, action) => {
      return state = action.payload
      
    }
  },
})

export const { addFavorite, removeFavorite, updatePhotoFavoritesList } = favoriteSlice.actions
export const getFavoritesData = (state)=> state.favorites
