import styles from './UserStyle.module.css';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { PiBuildingFill } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { ModalFilter } from '../../components/modalFilter/ModalFilter';
import { useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import { ModalDetails } from '../../components/modalDetails/modalDetails';

export const UserScreen = () => {
    const [filtro, setFiltro] = useState(null);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filtroByUser, setFiltroByUser] = useState(null);
    const [activeFilterByUser, setActiveFilterByUser] = useState(0);
    const [modalFilterOpenByUser, setModalFilterOpenByUser] = useState(false);

    const opciones = [
        { id: 1, name: "Al día", color: "#52b788" },
        { id: 2, name: "Pendientes", color: "#ffb703" },
        { id: 3, name: "En mora", color: "#d90429" },
    ]; 

    const nombres = [
        "Ana Rodríguez", "Carlos Pérez", "Luisa Gómez", "Miguel Torres", "Sofía Martínez",
        "Juan Ramírez", "Valentina Ruiz", "Javier Morales", "Camila Herrera", "Diego Vargas"
    ];

    const generateFacturas = (nombre) => {
        const cantidad = Math.floor(Math.random() * 5) + 1;
        return Array.from({ length: cantidad }, (_, i) => ({
            codigo: `FAC-${nombre.slice(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, '0')}`,
            fecha: `2025-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
            estadoID: (i % 3) + 1
        }));
    };

    const datos = nombres.map((nombre, i) => ({
        nombre,
        fecha: `2025-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
        estadoID: (i % opciones.length) + 1,
        facturas: generateFacturas(nombre)
    }));

    const datosFiltrados = filtro
        ? datos.filter(d => d.estadoID === filtro)
        : datos;

    const toggleModalFilter = () => setModalFilterOpen(!modalFilterOpen);
    const clearFilter = () => { setFiltro(null); setActiveFilter(0); };

    const toggleModalFilterByUser = () => setModalFilterOpen(!modalFilterOpenByUser);
    const clearFilterByUser = () => { setFiltroByUser(null); setActiveFilterByUser(0); };
    const closeUserModal = () => setSelectedUser(null);

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
                            <a className={styles.dot} style={{ backgroundColor: opcion.color }} />
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
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'fila-par' : 'fila-impar'}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setSelectedUser(dato)}
                                    >
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
                    <ModalFilter
                        onFiltrar={(id) => { setFiltro(id); setActiveFilter(id); }}
                        opciones={opciones}
                        modalOption={toggleModalFilter}
                    />
                )}
            </div>

            {selectedUser && (
                <ModalDetails onClose={closeUserModal} bill={selectedUser}>
                    <div className={styles.modalChildren}>
                        <div className={styles.leftBar}>
                            <div className={styles.filterContainer}>
                                <div style={{ position: "relative", width: 'auto', height: 'auto' }}>
                                    <IoFilter className={styles.filterIcon} onClick={toggleModalFilterByUser} />
                                    {activeFilter !== 0 && (
                                        <div className={styles.floatNumberContainer}><p className={styles.floatNumber}>1</p></div>
                                    )}
                                </div>
                                <p className={styles.filterText}>Filtrar...</p>
                                <div className={styles.innerSpace} />
                                {activeFilter !== 0 && (
                                    <FaFilterCircleXmark className={styles.filterIcon} onClick={clearFilterByUser} />
                                )}
                            </div>
                            {opciones.map((opcion, index) => (
                                <div key={index} className={styles.optionItem}>
                                    <a className={styles.dot} style={{ backgroundColor: opcion.color }} />
                                    <p className={styles.optionText}>{opcion.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(filtroByUser
                                        ? selectedUser.facturas.filter(f => f.estadoID === filtroByUser)
                                        : selectedUser.facturas
                                    ).map((factura, index) => {
                                        const estado = opciones.find(opt => opt.id === factura.estadoID);
                                        return (
                                            <tr key={index}>
                                                <td>{factura.codigo}</td>
                                                <td>{factura.fecha}</td>
                                                <td style={{ color: estado?.color }}>{estado?.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {modalFilterOpenByUser && (
                            <ModalFilter
                                onFiltrar={(id) => { setFiltroByUser(id); setActiveFilterByUser(id); }}
                                opciones={opciones}
                                modalOption={toggleModalFilterByUser}
                            />
                        )}
                    </div>
                </ModalDetails>
            )}
        </div>
    );
};
