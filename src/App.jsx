import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Root } from "./pages/Root"
import { Search } from "./pages/Search"
import { Favorites } from "./pages/Favorites"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route path ="/" element={<Search/>}/>
    <Route path="favorites" element={<Favorites/>}/>
  </Route>

))

function App() {


  return (
    <RouterProvider router ={router}>
     <Root />
    </RouterProvider>
  )
}

export default App
