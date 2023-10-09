import React from 'react'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from 'react-router-dom';
export const Nav =()=> {
  return (
    <>
      <p>PG</p>
      <NavLink to ="/">
        <ImageSearchIcon/>
      </NavLink>
      <NavLink to ="/favorites">
        <FavoriteIcon/>
      </NavLink>
      
    </>
  )
}
