import React from 'react'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from 'react-router-dom';


import Box from '@mui/material/Box'
import { Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'

export const Nav =()=> {
  return (
    <Box 
    sx={{ backgroundColor: '#161D2F',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '10px 20px', }}>
        <Typography 
        variant='h2' 
        color="#FC4747" 
        fontWeight='fontWeightBold'>
          PG
        </Typography>
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
