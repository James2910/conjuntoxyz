import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        // Bloquea scroll al montar
        document.body.style.overflow = 'hidden';
        return () => {
            // Libera scroll al desmontar
            document.body.style.overflow = '';
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Segoe UI, sans-serif',
            padding: '2rem',
            color: '#333',
        }}>
            <h1 style={{
                fontSize: '6rem',
                fontWeight: 'bold',
                color: '#e74c3c',
                marginBottom: '1rem',
            }}>404</h1>
            <h2 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
            }}>Página no encontrada</h2>
            <p style={{
                fontSize: '1.2rem',
                marginBottom: '2rem',
                textAlign: 'center',
                maxWidth: '400px',
                color: '#666'
            }}>
                Lo sentimos, la página que estás buscando no existe o fue movida.
            </p>
            <Link to="/home" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s ease'
            }}>
                <FaArrowLeft /> Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;
