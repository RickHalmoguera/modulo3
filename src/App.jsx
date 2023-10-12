import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Root } from "./pages/Root"
import { Search } from "./pages/Search"
import { Favorites } from "./pages/Favorites"
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const font = "'Outfit', sans-serif"
const THEME = createTheme({
  typography: {
   "fontFamily": font,
   "fontSize": 10,
   "fontWeightLight": 100,
   "fontWeightRegular": 400,
   "fontWeightBold": 700
  },
  
}) 

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route path ="/" element={<Search/>}/>
    <Route path="favorites" element={<Favorites/>}/>
  </Route>

))

function App() {
  return (
    <ThemeProvider theme ={THEME}>
      <CssBaseline />
      <RouterProvider router ={router}>
      <Root />
      </RouterProvider>
    </ThemeProvider>
  )
}

export default App
