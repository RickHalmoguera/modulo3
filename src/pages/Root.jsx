import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { useDispatch } from "react-redux";
import { getAllThunk } from "../features/search/searchSliceThunk";


export const Root = ()=>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllThunk())
      }, [])
    
    return(
        <>
            <Nav />
            <Outlet />
        </>
    )
}