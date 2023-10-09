import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Search } from "./Search";


export const Root = ()=>{
    return(
        <>
            <Nav />
            <Search/>
        </>
    )
}