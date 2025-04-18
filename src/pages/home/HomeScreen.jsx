import React, { useEffect, useState } from 'react'
import styles from './HomeStyles.module.css'
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu'
import { PiBuildingFill } from "react-icons/pi";
import { useSelector } from 'react-redux';


export const HomeScreen = () => {
    const { open } = useSelector(state => state.hamburger);

    const [inputValue, setInputValue] = useState("");
    const opciones = ["Manzana", "Pera", "Banano", "Durazno", "Mandarina"];
    const opcionesFiltradas = opciones.filter(op =>
        op.toLowerCase().includes(inputValue.toLowerCase())
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
                        className={styles.input} placeholder="Buscar..." 
                    />

                    {inputValue && opcionesFiltradas.length > 0 && (
                        <div className={styles.optionsBox}>
                            {opcionesFiltradas.map((opcion, index) => (
                                <div key={index} className={styles.optionItem}>
                                    <p className={styles.optionText}>{opcion}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
