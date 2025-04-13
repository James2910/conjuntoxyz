import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomeScreen } from "../pages/home/HomeScreen"

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}