import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomeScreen } from "../pages/home/HomeScreen"
import { UserScreen } from "../pages/user/UserScreen"

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomeScreen /> } />
        <Route path="/users" element={ <UserScreen /> } />
      </Routes>
    </BrowserRouter>
  )
}