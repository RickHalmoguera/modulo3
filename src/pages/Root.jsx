import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Search } from "./Search";
import { Favorites } from "./Favorites";


export const Root = ()=>{
    return(
        <>
            <Nav />
            <Outlet/>
        </>
    )
}