import React, { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search'
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useDispatch, useSelector } from "react-redux"
import { getPhotoData, getPhotoStatus, getPhotoError } from "../features/search/searchSlice" 
import { addFavorite } from "../features/favoritesSlice/favoritesSlice";
import { getAllThunk, getSearchThunk } from '../features/search/searchSliceThunk'



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

  const handleAddToFavorite = (photo)=>{
    console.log(photo)
    dispatch(addFavorite(photo));
  }
  /*useEffect(() => {
    dispatch(getAllThunk())
  }, [])*/

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
    
      {photos.map((photo) => (
        <div key={photo.img} className="photo-card">
          <img src={photo.img} alt={photo.description} />
          <TurnedInNotIcon onClick={() => handleAddToFavorite(photo)} />
          <div className="photo-details">
          <p>{photo.id}</p>
            <p>{photo.description}</p>
            <p>Date: {photo.date}</p>
            <p>Dimensions: {photo.width}x{photo.height}</p>
            <p>Likes: {photo.likes}</p>
            <a href={photo.download} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </div>
        </div>
      ))}
    </>
  )
}
