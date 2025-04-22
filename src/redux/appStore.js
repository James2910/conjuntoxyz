import { configureStore } from '@reduxjs/toolkit'
import HamburgerSlice from './hambugerMenu/HamburgerSlice'
import HomeSlice from './home/HomeSlice'
import BillsSlice from './facturas/BillsSlice'

export default configureStore({
  reducer: {
    hamburger: HamburgerSlice,
    home: HomeSlice,
    bills: BillsSlice,
  },
})