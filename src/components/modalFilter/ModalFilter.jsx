import { useState } from 'react';
import styles from './ModalFilterStyle.module.css';
import { IoClose } from "react-icons/io5";


export const ModalFilter = ({ onFiltrar, opciones, modalOption }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

    const manejarFiltro = (opcion) => {
        setEstadoSeleccionado(opcion);
        onFiltrar(opcion.id); // función que recibe el ID seleccionado
        modalOption();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.contenido}>
                <div className={styles.closeButtonContainer} onClick={() => modalOption()}>
                    <IoClose className={styles.closeIcon} />
                </div>
                <h2 className={styles.titulo}>
                    Estado:{" "}
                    <span style={{ color: estadoSeleccionado?.color || '#fff' }}>
                        {estadoSeleccionado?.name || 'Ninguno'}
                    </span>
                </h2>
                <div className={styles.opciones}>
                    {opciones.map(opcion => (
                        <button
                            key={opcion.id}
                            style={{ backgroundColor: opcion.color }}
                            className={styles.boton}
                            onClick={() => manejarFiltro(opcion)}
                        >
                            {opcion.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
