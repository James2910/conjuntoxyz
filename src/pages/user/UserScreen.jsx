import styles from './UserStyle.module.css';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { PiBuildingFill } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { ModalFilter } from '../../components/modalFilter/ModalFilter';
import { useEffect, useRef, useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import { ModalDetails } from '../../components/modalDetails/modalDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getResidentes } from '../../redux/home/HomeSlice';
import { getFacturas } from '../../redux/facturas/BillsSlice';
import { useLocation } from 'react-router-dom';


export const UserScreen = () => {
    const dispatch = useDispatch();
    const residentes = useSelector(state => state.home.residentes);
    const facturas = useSelector(state => state.bills.data);
    const detalles = useSelector((state) => state.bills.detalles);

    const location = useLocation();
    const wasAutoOpened = useRef(false);

    useEffect(() => {
        if (!wasAutoOpened.current && residentes.length > 0) {
            const userFromState = location.state?.op;
            if (userFromState) {
                setSelectedUser(userFromState);
                dispatch(getFacturas({
                idResidente: userFromState.id,
                indicadorAlDia: false,
                indicadorPendientes: false,
                indicadorMora: false,
                }));
                wasAutoOpened.current = true; // marcamos como abierto
            }
        }
      }, [location, residentes, dispatch]);

    const [filtro, setFiltro] = useState(null);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);

    const [selectedUser, setSelectedUser] = useState(null);
    const [filtroByUser, setFiltroByUser] = useState(null);
    const [activeFilterByUser, setActiveFilterByUser] = useState(0);
    const [modalFilterOpenByUser, setModalFilterOpenByUser] = useState(false);
    
    const [selectedUserBill, setSelectedUserBill] = useState(null);
    const [filtroByUserBill, setFiltroByUserBill] = useState(null);
    const [activeFilterByUserBill, setActiveFilterByUserBill] = useState(0);
    const [modalFilterOpenByUserBill, setModalFilterOpenByUserBill] = useState(false);

    const opciones = [
        { id: "1", name: "Al día", color: "#52b788" },
        { id: "2", name: "Pendientes", color: "#ffb703" },
        { id: "3", name: "En mora", color: "#d90429" },
    ]; 

    const handleSelectUser = (residente) => {
        setSelectedUser(residente);
        dispatch(getFacturas({
            idResidente: residente.idResidente, // filtrar por residente
            indicadorAlDia: false,
            indicadorPendientes: false,
            indicadorMora: false,
        }));
    };

    const residentesFiltrados = filtro
        ? residentes.filter(r => r.estadoID === filtro)
        : residentes;

    const toggleModalFilter = () => setModalFilterOpen(!modalFilterOpen);
    const clearFilter = () => { setFiltro(null); setActiveFilter(0); };

    const toggleModalFilterByUser = () => setModalFilterOpenByUser(!modalFilterOpenByUser);
    const clearFilterByUser = () => { setFiltroByUser(null); setActiveFilterByUser(0); };
    const closeUserModal = () => setSelectedUser(null);
    
    const closeUserBillModal = () => setSelectedUserBill(null);
    

    console.log(selectedUser)
    console.log(selectedUserBill);

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
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residentesFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '1rem' }}>
                                        No se encontraron resultados con el estado seleccionado.
                                    </td>
                                </tr>
                            ) : (
                                residentesFiltrados.map((res, index) => {
                                    const opcion = opciones.find(opt => opt.id === res.numEstado);
                                    return (
                                        <tr
                                            key={res.idResidente}
                                            className={index % 2 === 0 ? 'fila-par' : 'fila-impar'}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSelectUser(res)}
                                        >
                                            <td>{res.nombreCompleto}</td>
                                            <td style={{ color: opcion?.color || '#000' }}>{opcion?.name || 'Desconocido'}</td>
                                        </tr>
                                    );
                                })
                            )}
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
                                    {activeFilterByUser !== 0 && (
                                        <div className={styles.floatNumberContainer}><p className={styles.floatNumber}>1</p></div>
                                    )}
                                </div>
                                <p className={styles.filterText}>Filtrar...</p>
                                <div className={styles.innerSpace} />
                                {activeFilterByUser !== 0 && (
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
                                    {(() => {
                                        const facturasFiltradas = facturas.filter(
                                            factura => !filtroByUser || factura.numEstado === filtroByUser
                                        );

                                        if (facturasFiltradas.length === 0) {
                                            return (
                                                <tr>
                                                    <td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>
                                                        No se encontraron facturas con el estado seleccionado.
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return facturasFiltradas.map((factura, index) => {
                                            const opcion = opciones.find(opt => opt.id === factura.numEstado);
                                            return (
                                                <tr 
                                                    key={factura.codigo} 
                                                    className={index % 2 === 0 ? 'fila-par' : 'fila-impar'}
                                                    onClick={() => {
                                                        setSelectedUserBill({
                                                            ...factura,
                                                            residente: selectedUser,
                                                            totalFactura: factura.total,
                                                        });
                                                    }}
                                                >
                                                    <td>{factura.codigo}</td>
                                                    <td>{factura.fechaVencimiento}</td>
                                                    <td style={{ color: opcion?.color || '#000' }}>
                                                        {opcion?.name || 'Desconocido'}
                                                    </td>
                                                </tr>
                                            );
                                        });
                                    })()}
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

            {/* Modal para detalle de factura por usuario */}
            {selectedUserBill && (
                <ModalDetails onClose={closeUserBillModal} bill={selectedUserBill}>
                    <div className={styles.codFactura}>
                        <h2>{selectedUserBill.codigo}</h2>
                    </div>
                    <div className={styles.billTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Servicio</th>
                                    <th>Monto</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(detalles[selectedUserBill.idFactura] || []).map((item, index) => (
                                    <tr key={index}>
                                    <td>{item.servicio}</td>
                                    <td>${item.monto.toLocaleString('es-CO')}</td>
                                    <td>{item.descripcionServicio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    <div className={styles.totalFactura}>
                        <strong>Total: </strong>${selectedUserBill.totalFactura.toLocaleString("es-CO")}
                    </div>
                    </div>
                </ModalDetails>
            )}
        </div>
    );
};
