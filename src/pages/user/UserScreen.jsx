import styles from './UserStyle.module.css';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { PiBuildingFill } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { ModalFilter } from '../../components/modalFilter/ModalFilter';
import { useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";



export const UserScreen = () => {
    const [filtro, setFiltro] = useState(null);
    const [modalFilterOpen, setModalFilterOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState(0)

    const opciones = [
        { id: 1, name: "Al día", color: "#52b788" },
        { id: 2, name: "Pendientes", color: "#ffb703" },
        { id: 3, name: "En mora", color: "#d90429" },
    ]; 

    const nombres = [
        "Ana Rodríguez", "Carlos Pérez", "Luisa Gómez", "Miguel Torres", "Sofía Martínez",
        "Juan Ramírez", "Valentina Ruiz", "Javier Morales", "Camila Herrera", "Diego Vargas"
    ];
  
    const datos = Array.from({ length: 50 }, (_, i) => ({
        nombre: nombres[i % nombres.length],
        fecha: `2025-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
        estadoID: (i % opciones.length) + 1
    }));

    let datosFiltrados = filtro
        ? datos.filter(d => d.estadoID === filtro)
        : datos;

    const toggleModalFilter = () => {
        setModalFilterOpen(!modalFilterOpen);
    }

    const clearFilter = () => {
        setFiltro(null);
        setActiveFilter(0);
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.HamburguerMenuContainer}>
                    <HamburgerMenu left='40px' top='30px' />
                </div>
                <div className={styles.innerSpace} />
                <div className={styles.iconContainer}>
                    <PiBuildingFill className={styles.icon} />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.leftBar}>
                    <div className={styles.filterContainer}>
                        <div style={{ position: "relative", width: 'auto', height: 'auto' }}>
                            <IoFilter className={styles.filterIcon} onClick={toggleModalFilter} />
                            {activeFilter !== 0 && (
                                <div className={styles.floatNumberContainer}><p className={styles.floatNumber}>1</p></div>
                            )}
                        </div>
                        <p className={styles.filterText}>Filtrar...</p>
                        <div className={styles.innerSpace} />
                        {activeFilter !== 0 && (
                            <FaFilterCircleXmark className={styles.filterIcon} onClick={clearFilter} />
                        )}
                    </div>
                    {opciones.map((opcion, index) => (
                        <div key={index} className={styles.optionItem}>
                            <a className={styles.dot} style={{backgroundColor: opcion.color}} />
                            <p className={styles.optionText}>{opcion.name}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha de Emisión</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosFiltrados.map((dato, index) => {
                                const opcion = opciones.find(opt => opt.id === dato.estadoID);

                                return (
                                <tr key={index} className={index % 2 === 0 ? 'fila-par' : 'fila-impar'}>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.fecha}</td>
                                    <td style={{ color: opcion?.color || '#000' }}>{opcion?.name || 'Desconocido'}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {modalFilterOpen && (
                    <div>
                        <ModalFilter onFiltrar={(id) => {setFiltro(id); setActiveFilter(id)}} opciones={opciones} modalOption={() => toggleModalFilter()} />
                    </div>
                )}
            </div>
        </div>
    )
}
