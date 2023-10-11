import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getFavoritesData } from '../features/favoritesSlice/favoritesSlice'
import { removeFavorite, updatePhotoFavoritesList } from '../features/favoritesSlice/favoritesSlice'
import { getPhotoData, updatePhotoList } from "../features/search/searchSlice"
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import { useState, useEffect } from 'react'

export const Favorites = () => {

  const photos = useSelector(getPhotoData)
  const [favorites, setFavorites] = useState (useSelector(getFavoritesData))
  const [initialFavorites,setInitialFavorites] = useState(favorites)
  const dispatch = useDispatch()

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
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(searchWord!=""){
      setFavorites(favorites.filter((photo) => photo.description.includes(searchWord)))
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
    setEditingPhotoId(null) 
  }

  const handleClick = (photo) => {
    setEditingPhotoId(photo.id) 
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
