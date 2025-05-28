import { configureStore } from '@reduxjs/toolkit'
import HamburgerSlice from './hambugerMenu/HamburgerSlice'
import HomeSlice from './home/HomeSlice'
import BillsSlice from './facturas/BillsSlice'
import AuthSlice from './auth/AuthSlice'

export default configureStore({
	reducer: {
		hamburger: HamburgerSlice,
		home: HomeSlice,
		bills: BillsSlice,
		auth: AuthSlice,
	},
})