import React, { useEffect, useState } from 'react'
import styles from './HomeStyles.module.css'
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu'
import { PiBuildingFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { getResidentes } from '../../redux/home/HomeSlice';
import { useNavigate } from 'react-router-dom';


export const HomeScreen = () => {
    const dispatch = useDispatch();
    const { open } = useSelector(state => state.hamburger);
    const residentes = useSelector((state) => state.home.residentes);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getResidentes({
            idResidente: "",
            nombre: "",
            indicadorAlDia: false,
            indicadorPendientes: false,
            indicadorMora: false,
        }));
    }, [dispatch]);

    const [inputValue, setInputValue] = useState("");

    const opciones = residentes.map(r => ({
        id: r.idResidente,
        nombreCompleto: r.nombreCompleto,
        vivienda: `${r.tipoVivienda} - ${r.numeroVivienda}`
    }));

    const opcionesFiltradas = opciones.filter(op =>
        op.nombreCompleto.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className={styles.mainContainer}>
            <div className={styles.HamburguerMenuContainer}>
                <HamburgerMenu />
            </div>
            
            <div className={`${styles.container} ${open ? styles.shifted : ''}`}>
                <div className={styles.iconContainer}>
                    <PiBuildingFill className={styles.icon} />
                </div>
                    
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className={styles.input}
                        placeholder="Buscar residente..."
                    />

                    {inputValue && opcionesFiltradas.length > 0 && (
                        <div className={styles.optionsBox}>
                        {opcionesFiltradas.map(op => (
                            <div
                                key={op.id}
                                className={styles.optionItem}
                                onClick={() => navigate(`/usuario/${op.idResidente}`)}
                            >
                                <span className={styles.optionName}>
                                    {op.nombreCompleto}
                                </span>
                                <span className={styles.optionVivienda}>
                                    {op.vivienda}
                                </span>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
