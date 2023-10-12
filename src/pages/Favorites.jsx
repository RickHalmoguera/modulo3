import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getFavoritesData } from '../features/favoritesSlice/favoritesSlice'
import { removeFavorite, updatePhotoFavoritesList } from '../features/favoritesSlice/favoritesSlice'
import { getPhotoData, updatePhotoList } from "../features/search/searchSlice"
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import { useState } from 'react'
import { Box } from '@mui/material'

export const Favorites = () => {

  const dispatch = useDispatch()
  const photos = useSelector(getPhotoData)
  const [favorites, setFavorites] = useState (useSelector(getFavoritesData))
  const [initialFavorites,setInitialFavorites] = useState(favorites)

  const [searchWord,setSearchWord] = useState("")
  const [editingPhotoId, setEditingPhotoId] = useState(null) 
  const [newDescription, setNewDescription] = useState("")

  const handleRemoveFavorite = (photo) => {
    const idToRemove = photo.id
    dispatch(removeFavorite(idToRemove))
    
    const updatedPhotosToShow = photos.map((item) =>
    item.id === idToRemove ? { ...item, isFavorite: false } : item
    )
    dispatch(updatePhotoList(updatedPhotosToShow))
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== idToRemove))

  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(searchWord!==""){
      setFavorites((prevFavorites) => prevFavorites.filter((photo) => photo.description.includes(searchWord)))
    }else{
      setFavorites(initialFavorites)
    }
  }

  const handleEdit = (photo) => {
    const photoModify = photo.id

    const updatedPhotosToShow = favorites.map((item) =>
      item.id === photoModify ? { ...item, description: newDescription } : item
    )

    dispatch(updatePhotoFavoritesList(updatedPhotosToShow))
    setFavorites(updatedPhotosToShow)
    setEditingPhotoId(null) 
  }

  const handleClick = (photo) => {
    setEditingPhotoId(photo.id) 
  }

  const handleChange = (e) => {
    const selectedOption = e.target.value
  
    if (selectedOption === "width") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => a.width - b.width
      )
      setFavorites(updatedPhotosToShow)
    } else if (selectedOption === "height") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => a.height - b.height
      )
      setFavorites(updatedPhotosToShow)
    } else if (selectedOption === "likes") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => a.likes - b.likes
      )
      setFavorites(updatedPhotosToShow)
    } else if (selectedOption === "date") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => new Date(a.date).getFullYear() - new Date(b.date).getFullYear()
      )
      setFavorites(updatedPhotosToShow)
    }
  }
  
  return (
    <>
      <h1>Favorite Photos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="searchFavorites" onChange={(e)=>setSearchWord(e.currentTarget.value)}/>
        <button type="submit">
          <SearchIcon/>
        </button>
      </form>
      <label htmlFor="sort">Sort by: </label>
      <select name="sort" id="sort" onChange={handleChange}>
        <option value="width">Width</option>
        <option value="height">Height</option>
        <option value="likes">Likes</option>
        <option value="date">Date</option>
      </select>
      <h2>Your favorites photos</h2>
      {favorites.map((photo) => (
        <div key={photo.img} className="photo-card">
          <img src={photo.img} alt={photo.description} />
          <TurnedInIcon onClick={() => handleRemoveFavorite(photo)} />
          <div className="photo-details">
            {editingPhotoId === photo.id ? (
              <input
                type='text'
                placeholder={photo.description}
                onChange={(e) => setNewDescription(e.currentTarget.value)}
              />
            ) : (
              <p>{photo.description}</p>
            )}
            <button>
              {editingPhotoId === photo.id ? (
                <SaveIcon onClick={() => handleEdit(photo)} />
              ) : (
                <EditIcon onClick={() => handleClick(photo)} />
              )}
            </button>
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
