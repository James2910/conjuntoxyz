import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { HomeScreen } from "../pages/home/HomeScreen"
import { UserScreen } from "../pages/user/UserScreen"
import { BillsScreen } from "../pages/facturas/BillsScreen"
import { LoginScreen } from "../pages/login/LoginScreen"

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/home" element={ <HomeScreen /> } />
        <Route path="/login" element={ <LoginScreen /> } />
        <Route path="/users" element={ <UserScreen /> } />
        <Route path="/bills" element={ <BillsScreen /> } />
      </Routes>
    </BrowserRouter>
  )
}