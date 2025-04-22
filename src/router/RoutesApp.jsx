import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomeScreen } from "../pages/home/HomeScreen"
import { UserScreen } from "../pages/user/UserScreen"
import { BillsScreen } from "../pages/facturas/BillsScreen"

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomeScreen /> } />
        <Route path="/users" element={ <UserScreen /> } />
        <Route path="/usuario/:id" element={<UserScreen />} />
        <Route path="/bills" element={ <BillsScreen /> } />
      </Routes>
    </BrowserRouter>
  )
}