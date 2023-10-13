import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { useDispatch } from "react-redux";
import { getAllThunk } from "../features/search/searchSliceThunk";
import { Box } from "@mui/material";
import { useMediaQuery } from '@mui/material';


export const Root = ()=>{
    const isBigScreen = useMediaQuery('(min-width:1000px)');
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllThunk())
      }, [])
    
    return(
        <Box
      sx={{
        display: 'flex',
        flexDirection: isBigScreen ? 'row' : 'column',
      }}
    >
            <Nav />
            <Box sx={{width:'100%',
                      minHeight:'100vh'}}>
            <Outlet />

            </Box>
        </Box>
    )
}