import React from 'react'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Nav =()=> {
  const isBigScreen = useMediaQuery('(min-width:1000px)');
  return (
    <Box 
    sx={{ backgroundColor: '#161D2F',
    display: 'flex',
    flexDirection: isBigScreen ? 'column' : 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    gap:'2em',
    padding: '1em', }}>
        <Typography 
        variant='h2' 
        color="#FC4747" 
        fontWeight='fontWeightBold'>
          PG
        </Typography>
        <Box
        sx={{
          display: 'flex',
          flexDirection: isBigScreen ? 'column' : 'row',
          alignItems: isBigScreen ? '' : 'center',
          justifyContent: isBigScreen ? '' : 'center' ,
          gap:'1em',
          flex: 1, 
        }}>
        <NavLink 
        to ="/" 
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#545e6f',
        })}>
          <ImageSearchIcon 
          sx={{fontSize:32}}
          />
        </NavLink>
        <NavLink to ="/favorites"
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#545e6f',
        })}>
          <FavoriteIcon 
          sx={{fontSize:32}}
          />
        </NavLink>
        </Box>
      
    </Box>
  )
}
