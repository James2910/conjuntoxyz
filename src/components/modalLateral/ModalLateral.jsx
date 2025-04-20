import React from 'react'
import styles from './ModalLateralStyles.module.css'
import { PiBuildingFill } from "react-icons/pi";
import { RiArrowRightSFill } from "react-icons/ri";
import { FaFacebook, FaInstagramSquare, FaTiktok } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, setActiveOption } from "../../redux/hambugerMenu/HamburgerSlice"


export const ModalLateral = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { activeOption } = useSelector(state => state.hamburger);


    const indexes = [
        {
            name: "Inicio", link: "/", optionIndex: 1
        },
        {
            name: "Facturas", link: "/bills", optionIndex: 2
        },
        {
            name: "Residentes", link: "/users", optionIndex: 3
        },
    ];

    const handleNavigation = (option) => {
        dispatch(toggleModal());
        navigate(option.link);
        dispatch(setActiveOption(option.optionIndex));
    }

    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <PiBuildingFill className={styles.icon} />
            </div>

            <div className={styles.sectionsContainer}>
                {indexes.map((option, index) => (
                    <div key={index} className={activeOption == option.optionIndex ? styles.activeSectionItem : styles.sectionItem} onClick={() => handleNavigation(option)}>
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
