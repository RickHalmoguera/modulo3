import React, { useState } from "react"
import SearchIcon from '@mui/icons-material/Search'
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useDispatch, useSelector } from "react-redux"
import { getPhotoData, getPhotoStatus, getPhotoError, updatePhotoList } from "../features/search/searchSlice" 
import { addFavorite, removeFavorite } from "../features/favoritesSlice/favoritesSlice";
import { getSearchThunk, getAllThunk } from '../features/search/searchSliceThunk'

import { Box } from "@mui/material"
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar'


export const Search = () => {
  const dispatch = useDispatch()
  const photos = useSelector(getPhotoData)
  const status = useSelector(getPhotoStatus)
  const error = useSelector(getPhotoError)
  const [searchWord, setSearchWord] = useState("")

 
 
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(searchWord===""){
      dispatch(getAllThunk())
    }else{
      dispatch(getSearchThunk(searchWord))
      setSearchWord("")
    }
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

  return (
    <Box 
      p='1em'
      sx={{ backgroundColor: '#10141E'}}>

      <Typography 
        variant='h2'  
        color='#FFFFFF'
        textAlign='center'
        mt='2em'>
        
        Welcome to Photo Gallery!
      </Typography>

      <Box 
        display= 'flex'
        flexDirection='column'
        alignItems='center'
        gap='2em'
        pt='2em'
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
              value={searchWord}
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
      <Box>
        {status === "pending" &&
          <Typography
          variant='h4'  
          color='#FFFFFF'
          textAlign='center'
          fontWeight='100'
          p='2em'
          >
            Loading...
          </Typography>
        }
        {status === "rejected" &&
          <Typography
            variant='h4'  
            color='#FFFFFF'
            textAlign='center'
            fontWeight='100'
            p='2em'
          >Error: {error}
        </Typography>
        }
        <ImageList  
          gap={12}
          sx={{gridTemplateColumns:
          'repeat(auto-fill,minmax(280px,1fr))!important'}} 
        >
          {status === "fulfilled" && photos.map((photo,index) => (
            <ImageListItem key={photo.img} >
              <img 
              srcSet={photo.img}
              src={photo.img} 
              alt={photo.description} />
              <ImageListItemBar 
                position="top"
                sx={{
                  background:'transparent',
                  color:'#FFFFFF',
                  
                }}
                actionIcon={ photo.isFavorite ? 
                  <TurnedInIcon 
                    sx={{fontSize:32,
                        background:'rgba(0,0,0,0.3) 90%',
                        borderRadius: 50,
                        width: 40,
                        height: 40,}} 
                    onClick={() => handleRemoveFromFavorite(photo,index)} /> : 
                  
                  <TurnedInNotIcon  
                    sx={{fontSize:32,
                    background:'rgba(0,0,0,0.3) 90%',
                    borderRadius: 50,
                    width: 40,
                    height: 40,}}  
                  onClick={() => handleAddToFavorite(photo,index)} />} 
                  actionPosition="right"
              />
              
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  )
}
