
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { getFavoritesData } from '../features/favoritesSlice/favoritesSlice'
import { removeFavorite } from '../features/favoritesSlice/favoritesSlice';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
export const Favorites= () => {
  const favorites = useSelector(getFavoritesData)
  const dispatch = useDispatch()

  const handleRemoveFavorite = (photo) => {
    console.log(photo.id)
    dispatch(removeFavorite(photo.id))
  }

  return (
    <>
      <h1>Favorite Photos</h1>
      <input type="text" name="" id="searchFavorites" />
      <h2>Your favorites photos</h2>
      {favorites.map((photo) => (
        <div key={photo.img} className="photo-card">
          <img src={photo.img} alt={photo.description} />
          <TurnedInIcon onClick={() => handleRemoveFavorite(photo)} />
          <div className="photo-details">
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
