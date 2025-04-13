import React from 'react'
import styles from './HamburgerMenuStyles.module.css';
import { useHamburguerMenu } from '../../hooks/HamburgerMenu.hook';
import { ModalLateral } from '../modalLateral/ModalLateral';

export const HamburgerMenu = ({ setIsModalOpen }) => {
    const {
        isOpen, 
        toggleModal,
    } = useHamburguerMenu();
    
    return (
        <div>
            <div className={styles.buttonContainer}>
                <button 
					className={`${styles.button} ${isOpen ? `${styles.open} ${styles.moveAndRotate} ${styles.darkLines}` : styles.closed}`}
					onClick={() => {toggleModal(); setIsModalOpen(!isOpen)}}
				>
                    <div></div>
                </button>
            </div>

            <div className={` ${isOpen ? `${styles.modalContainer} ${styles.isOpen}`.trim() : `${styles.modalContainer} ${styles.isClose}`.trim()} `}>
                <ModalLateral />
            </div>
        </div>
  	);
}
