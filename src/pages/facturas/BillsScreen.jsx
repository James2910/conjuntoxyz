import styles from './BillsStyle.module.css';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { PiBuildingFill } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { ModalFilter } from '../../components/modalFilter/ModalFilter';
import { useEffect, useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import { ModalDetails } from '../../components/modalDetails/modalDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getFacturas, getDetallesFactura, getDetallesFacturaConResidente } from '../../redux/facturas/BillsSlice';


export const BillsScreen = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
      // Cambia los valores según el filtro que necesites aplicar
      dispatch(getFacturas({
        idResidente: '', // o algún ID si quieres filtrar por residente
        indicadorAlDia: false,
        indicadorPendientes: false,
        indicadorMora: false,
      }));
    }, [dispatch]);

    const facturas = useSelector((state) => state.bills.data);
    const detalles = useSelector((state) => state.bills.detalles);
    const residentes = useSelector((state) => state.bills.residentes);

    const [filtro, setFiltro] = useState(null);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);
    const [selectedBill, setSelectedBill] = useState(null);
    const [residenteSeleccionadoId, setResidenteSeleccionadoId] = useState(null);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);


    const opciones = [
        { id: "1", name: "Al día", color: "#52b788" },
        { id: "2", name: "Pendientes", color: "#ffb703" },
        { id: "3", name: "En mora", color: "#d90429" },
    ];

    const facturasFiltradas = filtro
        ? facturas.filter(f => f.numEstado === filtro)
        : facturas;

    const handleClickFactura = (idFactura, idResidente) => {
        dispatch(getDetallesFacturaConResidente({ idFactura, idResidente }));
    };

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

    useEffect(() => {
        if (facturaSeleccionada && residenteSeleccionadoId) {
          const residenteData = residentes[residenteSeleccionadoId];
          if (residenteData) {
            setSelectedBill({
              ...facturaSeleccionada,
              totalFactura: facturaSeleccionada.total,
              residente: residenteData,
            });
          }
        }
    }, [facturaSeleccionada, residenteSeleccionadoId, residentes]);
      
    

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
                        {facturasFiltradas.map((factura, index) => {
                                const opcion = opciones.find(opt => opt.id === factura.numEstado);

                                return (
                                <tr
                                    key={factura.id}
                                    className={`${styles.tableRow}`}
                                    onClick={() => {
                                        setFacturaSeleccionada(factura);
                                        setResidenteSeleccionadoId(factura.idResidente);
                                        dispatch(getDetallesFacturaConResidente({
                                          idFactura: factura.idFactura,
                                          idResidente: factura.idResidente,
                                        }));
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{factura.codigo}</td>
                                    <td>{new Date(factura.fechaVencimiento).toLocaleDateString()}</td>
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
                        <th>Monto</th>
                        <th>Descripción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(detalles[selectedBill.idFactura] || []).map((item, index) => (
                        <tr key={index}>
                        <td>{item.servicio}</td>
                        <td>${item.monto.toLocaleString('es-CO')}</td>
                        <td>{item.descripcionServicio}</td>
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
