import React from 'react'
import styles from './ModalLateralStyles.module.css'
import { PiBuildingFill } from "react-icons/pi";
import { RiArrowRightSFill } from "react-icons/ri";
import { FaFacebook, FaInstagramSquare, FaTiktok } from "react-icons/fa";


export const ModalLateral = () => {
    const indexes = [
        {
            name: "Inicio"
        },
        {
            name: "Facturas"
        },
        {
            name: "Residentes"
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <PiBuildingFill className={styles.icon} />
            </div>

            <div className={styles.sectionsContainer}>
                {indexes.map((option, index) => (
                    <div key={index} className={styles.sectionItem}>
                        <p className={styles.optionText}>{option.name}</p>
                        <RiArrowRightSFill className={styles.optionIcon} />
                    </div>
                    )
                )}
            </div>

            <div className={styles.socialMediaContainer}>
                <FaFacebook className={styles.mediaIcon} onClick={() => window.open('https://www.facebook.com', '_blank')} />
                <FaInstagramSquare className={styles.mediaIcon} onClick={() => window.open('https://www.instagram.com', '_blank')} />
                <FaTiktok className={styles.mediaIcon} onClick={() => window.open('https://www.tiktok.com', '_blank')} />
            </div>
        </div>
    )
}
