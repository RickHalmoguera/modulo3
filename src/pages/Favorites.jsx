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
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar'

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
    <Box 
      p='1em'
      sx={{ backgroundColor: '#10141E'}}>
      
      <Typography 
        variant='h2'  
        color='#FFFFFF'
        textAlign='center'
        mt='2em'>
        
        Favorites photos!
      </Typography>

      <Box 
        display= 'flex'
        flexDirection='column'
        alignItems='center'
        gap='2em'
        component="form"
        sx={{ display: 'flex', alignItems: '' }}
        onSubmit={handleSubmit}>

          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            mb='2em'
          >
            <TextField  variant="standard"  
              id="getPhoto" 
              label="Search for photos..." 
              onChange={(e)=>setSearchWord(e.currentTarget.value)}
              sx={{ input: { color: '#FFFFFF', fontSize: '1rem' },
                '& label.Mui-focused': { color: '#FFFFFF' },
                '& .MuiInputLabel-root': { color: '#FFFFFF' },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#5A698F', 
                },}}
            />

            <Button 
              variant='text'
              
              type="submit">
              <SearchIcon sx={{fontSize:32, color:'#FFF' }}/>
            </Button>

          </Box>

      </Box>

      <label htmlFor="sort">Sort by: </label>
      <select name="sort" id="sort" onChange={handleChange}>
        <option value="width">Width</option>
        <option value="height">Height</option>
        <option value="likes">Likes</option>
        <option value="date">Date</option>
      </select>
      <h2>Your favorites photos</h2>

      <ImageList  cols={2} >
        {favorites.map((photo) => (
          <ImageListItem key={photo.img} className="photo-card">
            <img 
              srcSet={photo.img}
              src={photo.img} 
              alt={photo.description} 
            />
            <ImageListItemBar 
              position="top"
              sx={{
                background:'transparent',
                color:'#FFFFFF',
                
              }}
              actionIcon={
                <TurnedInIcon 
                  sx={{fontSize:32,
                      background:'rgba(0,0,0,0.3) 90%',
                      borderRadius: 50,
                      width: 40,
                      height: 40,}}
                  onClick={() => handleRemoveFavorite(photo)} />}
            />

            <Box className="photo-details">
              {editingPhotoId === photo.id ? (
                <input
                  type='text'
                  placeholder={photo.description}
                  onChange={(e) => setNewDescription(e.currentTarget.value)}
                />
              ) : (
                <Typography>{photo.description}</Typography>
              )}

              <Button 
                variant='text'>
                {editingPhotoId === photo.id ? (
                  <SaveIcon sx={{fontSize:32, color:'#FFF' }} onClick={() => handleEdit(photo)} />
                ) : (
                  <EditIcon sx={{fontSize:32, color:'#FFF' }} onClick={() => handleClick(photo)} />
                )}
              </Button>
              
              <Typography variant='p'color='#FFFFFF'>Date: {photo.date}</Typography>
              <Typography variant='p'color='#FFFFFF' >Dimensions: {photo.width}x{photo.height}</Typography>
              <Typography variant='p'color='#FFFFFF'>Likes: {photo.likes}</Typography>
              <a href={photo.download} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </Box>
          </ImageListItem>
        ))}

      </ImageList>
    </Box>
  )
}
