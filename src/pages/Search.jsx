import React, { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search'
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useDispatch, useSelector } from "react-redux"
import { getPhotoData, getPhotoStatus, getPhotoError, updatePhotoList } from "../features/search/searchSlice" 
import { addFavorite, removeFavorite } from "../features/favoritesSlice/favoritesSlice";
import { getSearchThunk } from '../features/search/searchSliceThunk'



export const Search = () => {
  const dispatch = useDispatch()
  const photos = useSelector(getPhotoData)
  const status = useSelector(getPhotoStatus)
  const error = useSelector(getPhotoError)
  const [searchWord, setSearchWord] = useState("")

 
 
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(getSearchThunk(searchWord))
  }
    
  const handleAddToFavorite = (photo,index) => {
    dispatch(addFavorite(photo));
    const updatedPhotosToShow = photos.map((item, i) =>
      i === index ? { ...item, isFavorite: true } : item
    )
  
    dispatch(updatePhotoList(updatedPhotosToShow))
  
  }

  const handleRemoveFromFavorite = (photo,index) => {
    dispatch(removeFavorite(photo.id));
    const updatedPhotosToShow = photos.map((item, i) =>
      i === index ? { ...item, isFavorite: false } : item
    )
  
    dispatch(updatePhotoList(updatedPhotosToShow))
  };

  if (status === "pending") {
    return <div>Loading...</div>
  }

  if (status === "rejected") {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <h1>Welcome to Photo Gallery!</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="getPhoto" placeholder="Search fot photos..." onChange={(e)=>setSearchWord(e.currentTarget.value)}/>
        <button type="submit">
          <SearchIcon/>
        </button>
      </form>
    
      {photos.map((photo,index) => (
        <div key={photo.img} className="photo-card">
          <img src={photo.img} alt={photo.description} />
          { photo.isFavorite ? <TurnedInIcon onClick={() => handleRemoveFromFavorite(photo,index)} /> : <TurnedInNotIcon onClick={() => handleAddToFavorite(photo,index)} />} 
        
        </div>
      ))}
    </>
  )
}
