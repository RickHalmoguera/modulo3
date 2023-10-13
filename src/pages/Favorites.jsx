import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getFavoritesData } from '../features/favoritesSlice/favoritesSlice'
import { removeFavorite, updatePhotoFavoritesList } from '../features/favoritesSlice/favoritesSlice'
import { getPhotoData, updatePhotoList } from "../features/search/searchSlice"
import { useState } from 'react'

import DownloadIcon from '@mui/icons-material/Download';
import DateRangeIcon from '@mui/icons-material/DateRange'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import SearchIcon from '@mui/icons-material/Search'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import HeightIcon from '@mui/icons-material/Height'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'


export const Favorites = () => {

  const dispatch = useDispatch()
  const photos = useSelector(getPhotoData)
  const [favorites, setFavorites] = useState (useSelector(getFavoritesData))
  const [initialFavorites,setInitialFavorites] = useState(favorites)
  const [sortValue,setSortValue] = useState("")

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
    setSortValue(e.target.value)

  
    if (sortValue === "width") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => a.width - b.width
      )
      setFavorites(updatedPhotosToShow)
    } else if (sortValue === "height") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => a.height - b.height
      )
      setFavorites(updatedPhotosToShow)
    } else if (sortValue === "likes") {
      const updatedPhotosToShow = [...favorites].sort(
        (a, b) => a.likes - b.likes
      )
      setFavorites(updatedPhotosToShow)
    } else if (sortValue === "date") {
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
        pt='2em'
        component="form"
        
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

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="labelSort">Sort by</InputLabel>
        <Select
          labelId="labelSort"
          id="demo-simple-select-standard"
          onChange={handleChange}
          label="Sort by"
          value={sortValue}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'width'}>Width</MenuItem>
          <MenuItem value={'height'}>Twenty</MenuItem>
          <MenuItem value={'likes'}>Likes</MenuItem>
          <MenuItem value={'date'}>Date</MenuItem>
        </Select>
      </FormControl>

   

      <ImageList
        gap={12}
        sx={{gridTemplateColumns:
        'repeat(auto-fill,minmax(280px,1fr))!important'}}>
        {favorites.map((photo) => (
          <ImageListItem key={photo.img}  className="photo-card">
            <img 
              srcSet={photo.img}
              src={photo.img} 
              alt={photo.description}
              sx={{maxHeight: '50px' }}
              
            />
            <ImageListItemBar 
              position="top"
              sx={{
                background:'transparent',
                color:'#FFFFFF',
                
              }}
              actionIcon={
                <TurnedInIcon 
                  sx={{
                      background:'rgba(0,0,0,0.3) 90%',
                      borderRadius: 50,
                      width: 40,
                      height: 40,}}
                  onClick={() => handleRemoveFavorite(photo)} />}
            />

            <Box sx={{display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center',
                        p:1,}}>
              
              <Box sx={{display:'flex',
                        flexDirection:'column',
                        gap:1,
                        justifyContent:'space-between',
                        }}>

              <Box sx={{display:'flex',
                        gap:3,
                        alignItems: 'center',}}>

                <Box sx={{display:'flex',
                        gap:1,
                        alignItems: 'center',}}>
                  <HeightIcon
                    sx={{
                      color:'#FFF',
                      width: 32,
                      height: 32,}} 
                  />

                  <Typography 
                    variant='p'
                    color='#FFFFFF'>
                      {photo.height}
                  </Typography>
                </Box>

                <Box sx={{display:'flex',
                        gap:1,
                        alignItems: 'center',}}>
                  <HeightIcon
                    sx={{
                      color:'#FFF',
                      width: 32,
                      height: 32,
                      transform: 'rotate(90deg)',}} 
                  />
                  <Typography 
                    variant='p'
                    color='#FFFFFF'>
                      {photo.width}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{display:'flex',
                      justifyContent:'space-between',
                      }}>
                  <Box sx={{display:'flex',
                        gap:1,
                        alignItems: 'center',}}>
                    <ThumbUpIcon
                      sx={{
                        color:'#FFF',
                        width: 32,
                        height: 32,}} 
                    />
                    <Typography 
                      variant='p'
                      color='#FFFFFF'>
                        {photo.likes}
                    </Typography>
                  </Box>
  
                  <Box sx={{display:'flex',
                        gap:1,
                        alignItems: 'center',}}>
                    <DateRangeIcon
                      sx={{
                        color:'#FFF',
                        width: 32,
                        height: 32,}} 
                    />
                    <Typography 
                      variant='p'
                      color='#FFFFFF'>
                        {new Date(photo.date).getFullYear()}
                    </Typography>
                  </Box>
              </Box>
              

              </Box>
                  
    

              <Link to={photo.download}>
                <DownloadIcon
                  sx={{
                    color:'#FFF',
                    width: 32,
                    height: 32,}} 
                    />
              </Link>
            </Box>

             
            
            

            <Box 
              sx={{ display: 'flex',
                    justifyContent:'space-between' }}>
              {editingPhotoId === photo.id ? (
                <TextField
                  variant='standard'
                  id='description'
                  onChange={(e) => setNewDescription(e.currentTarget.value)}
                  sx={{ input: { color: '#FFFFFF', fontSize: '1rem' },
                      '& label.Mui-focused': { color: '#FFFFFF' },
                      '& .MuiInputLabel-root': { color: '#FFFFFF' },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#5A698F', 
                },}}
                />
              ) : (
                <Typography
                  color='#FFF'
                  fontSize='1.2rem'>
                    {photo.description}
                </Typography>
              )}

              <Button 
                variant='text'>
                {editingPhotoId === photo.id ? (
                  <SaveIcon sx={{fontSize:32, color:'#FFF' }} onClick={() => handleEdit(photo)} />
                ) : (
                  <EditIcon sx={{fontSize:32, color:'#FFF' }} onClick={() => handleClick(photo)} />
                )}
              </Button>

            </Box>
          </ImageListItem>
        ))}

      </ImageList>
    </Box>
  )
}
