import { useEffect } from 'react';
import styles from './ModalDetailsStyle.module.css';
import { FaUser } from "react-icons/fa";


export const ModalDetails = ({ onClose, bill, children }) => {
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <div className={styles.userHeader}>
                        <FaUser className={styles.userIcon} />
                        <div className={styles.userInfo}>
                            <div className={styles.userTopInfo}>
                                <p>{`${bill?.nombreResidente || bill?.nombreCompleto}`}</p>
                                <p>
                                    {`${bill.residente?.tipoVivienda || bill.tipoVivienda} - ${bill.residente?.numeroVivienda || bill.numeroVivienda}`}
                                </p>

                            </div>
                            <p>{`${bill.residente?.codigoTipoDocumento || bill.codigoTipoDocumento}. ${bill.numeroDocumentoResidente || bill.numeroDocumento}`}</p>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>✖</button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};
