import styles from './UserStyle.module.css';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { PiBuildingFill } from "react-icons/pi";

export const UserScreen = () => {
    const opciones = [
        {
            name: "Al día", color: "#52b788",
        },
        {
            name: "Pendientes", color: "#ffb703",
        },
        {
            name: "En mora", color: "#d90429",
        },
    ];

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
                    {opciones.map((opcion, index) => (
                        <div key={index} className={styles.optionItem}>
                            <a className={styles.dot} style={{backgroundColor: opcion.color}} />
                            <p className={styles.optionText}>{opcion.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
