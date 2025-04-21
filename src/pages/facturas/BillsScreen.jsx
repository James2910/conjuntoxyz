import styles from './BillsStyle.module.css';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { PiBuildingFill } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { ModalFilter } from '../../components/modalFilter/ModalFilter';
import { useEffect, useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import { ModalDetails } from '../../components/modalDetails/modalDetails';


export const BillsScreen = () => {
    const [filtro, setFiltro] = useState(null);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);
    const [selectedBill, setSelectedBill] = useState(null);

    const opciones = [
        { id: 1, name: "Al día", color: "#52b788" },
        { id: 2, name: "Pendientes", color: "#ffb703" },
        { id: 3, name: "En mora", color: "#d90429" },
    ];

    const nombres = [
        "Ana Rodríguez", "Carlos Pérez", "Luisa Gómez", "Miguel Torres", "Sofía Martínez",
        "Juan Ramírez", "Valentina Ruiz", "Javier Morales", "Camila Herrera", "Diego Vargas"
    ];

    const serviciosDisponibles = [
        { nombre: "Administración", precio: 150000 },
        { nombre: "Piscina", precio: 50000 },
        { nombre: "Multas", precio: 30000 },
        { nombre: "BBQ", precio: 40000 }
    ];
    
    const getRandomServicios = () => {
        const numServicios = Math.floor(Math.random() * serviciosDisponibles.length) + 1;
        const seleccionados = serviciosDisponibles
            .sort(() => 0.5 - Math.random()) // desordenar
            .slice(0, numServicios)
            .map(servicio => ({
                nombre: servicio.nombre,
                precio: servicio.precio,
                cantidad: Math.floor(Math.random() * 3) + 1 // cantidad entre 1 y 3
            }));
        return seleccionados;
    };
    
    const datos = Array.from({ length: 50 }, (_, i) => ({
        codigo: `FAC-2025-${(i + 1).toString().padStart(4, '0')}`,
        fecha: `2025-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
        estadoID: (i % 3) + 1,
        nombre: nombres[i % nombres.length],
        apto: `Apto ${100 + i}`,
        telefono: `3001234${i.toString().padStart(3, '0')}`,
        servicios: getRandomServicios() // 👈 ¡nuevo campo!
    }));

    const datosFiltrados = filtro
        ? datos.filter(d => d.estadoID === filtro)
        : datos;

    const toggleModalFilter = () => {
        setModalFilterOpen(!modalFilterOpen);
    }

    const clearFilter = () => {
        setFiltro(null);
        setActiveFilter(0);
    };

    const closeBillModal = () => {
        setSelectedBill(null);
    };
    

    return (
        <>
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
                                <div className={styles.floatNumberContainer}>
                                    <p className={styles.floatNumber}>1</p>
                                </div>
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
                                <th>Código</th>
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
                                        onClick={() => {
                                            const totalFactura = dato.servicios?.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
                                            setSelectedBill({ ...dato, totalFactura });
                                        }}                                        
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{dato.codigo}</td>
                                        <td>{dato.fecha}</td>
                                        <td style={{ color: opcion?.color || '#000' }}>
                                            {opcion?.name || 'Desconocido'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {modalFilterOpen && (
                    <div>
                        <ModalFilter
                            onFiltrar={(id) => { setFiltro(id); setActiveFilter(id); }}
                            opciones={opciones}
                            modalOption={() => toggleModalFilter()}
                        />
                    </div>
                )}
            </div>
        </div>
        {selectedBill && (
            <ModalDetails onClose={closeBillModal} bill={selectedBill}>
                <div className={styles.codFactura}>
                    <h2>{selectedBill.codigo}</h2>
                </div>
                <div className={styles.billTable}>
                    <table>
                        <thead>
                        <tr>
                            <th>Servicio</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedBill.servicios.map((item, index) => (
                            <tr key={index}>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>${item.precio.toLocaleString('es-CO')}</td>
                            <td>${(item.precio * item.cantidad).toLocaleString('es-CO')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={styles.totalFactura}>
                        <strong>Total: </strong>${selectedBill.totalFactura.toLocaleString("es-CO")}
                    </div>
                </div>
            </ModalDetails>
        )}
        </>
    )
}
