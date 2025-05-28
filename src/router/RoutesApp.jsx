import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { HomeScreen } from "../pages/home/HomeScreen"
import { UserScreen } from "../pages/user/UserScreen"
import { BillsScreen } from "../pages/facturas/BillsScreen"
import { LoginScreen } from "../pages/login/LoginScreen"
import { PrivateRoute } from "../components/PrivateRoute"
import NotFound from "../pages/notFound/NotFound"

export const RoutesApp = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={ <Navigate to="/login" /> } />

				<Route path="/login" element={ <LoginScreen /> } />

				<Route path="/home" element={ 
					<PrivateRoute> 
						<HomeScreen /> 
					</PrivateRoute> 
				} />

				<Route path="/users" element={ 
					<PrivateRoute> 
						<UserScreen /> 
					</PrivateRoute> 
				} />

				<Route path="/bills" element={ 
					<PrivateRoute> 
						<BillsScreen /> 
					</PrivateRoute> 
				} />

				{/* Not Found Component */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}