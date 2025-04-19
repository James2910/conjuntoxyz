import styles from './HamburgerMenuStyles.module.css';
import { ModalLateral } from '../modalLateral/ModalLateral';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from "../../redux/hambugerMenu/HamburgerSlice"

export const HamburgerMenu = ({left = '40px', top = '40px'}) => {
    const dispatch = useDispatch();
    const { open } = useSelector(state => state.hamburger);
    
    return (
        <div>
            <div className={styles.buttonContainer} style={{left, top}}>
                <button 
                    className={`${styles.button} ${open ? `${styles.open} ${styles.moveAndRotate} ${styles.darkLines}` : ''}`}
                    onClick={() => dispatch(toggleModal())}
                >
                    <div></div>
                </button>
            </div>

            <div className={` ${open ? `${styles.modalContainer} ${styles.isOpen}`.trim() : `${styles.modalContainer} ${styles.isClose}`.trim()} `}>
                <ModalLateral />
            </div>
        </div>
  	);
}
