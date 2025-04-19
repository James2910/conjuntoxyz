import { configureStore } from '@reduxjs/toolkit'
import HamburgerSlice from './hambugerMenu/HamburgerSlice'

export default configureStore({
  reducer: {
    hamburger: HamburgerSlice,
  },
})