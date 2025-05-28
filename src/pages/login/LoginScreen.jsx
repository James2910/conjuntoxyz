import React, { useState } from 'react';
import { PiBuildingFill } from "react-icons/pi";
import styles from './LoginStyles.module.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/AuthSlice';
import { useDispatch } from 'react-redux';

export const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setErrorMessage("");
		
		const formData = {
			usuario: user,
			contrasena: password,
		}

		try {
			const response = await api.post('/usuarios/validarLogin', formData);
			
			if (response.data === true) {
				dispatch(login({ formData }));
				navigate('/home');
			} else {
				setErrorMessage('Usuario o contraseña incorrectos');
			}
		} catch (error) {
			console.error('Error al iniciar sesión:', error);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<div className={styles.loginIcon}>
					<PiBuildingFill className={styles.icon} />
				</div>
				<h2 className={styles.loginTitle}>Bienvenido</h2>
				<p className={styles.loginSubtitle}>Ingresa a la plataforma</p>
				<form onSubmit={handleLogin} className={styles.loginForm}>
					<input
						type="text"
						placeholder="Usuario"
						value={user}
						onChange={(e) => setUser(e.target.value)}
						required
						className={styles.loginInput}
					/>
					<input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className={styles.loginInput}
					/>
					<button type="submit" className={styles.loginButton}>
						Iniciar sesión
					</button>
				</form>
				{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
				<p className={styles.loginFooter}>© 2025 Conjunto XYZ</p>
			</div>
		</div>
	);
};
